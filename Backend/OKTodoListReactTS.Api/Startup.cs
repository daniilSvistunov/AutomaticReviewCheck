using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Ardalis.Result.AspNetCore;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.ApplicationInsights.NLogTarget;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Config;
using NLog.Targets;
using OKTodoListReactTS.Api.ErrorHandling;
using OKTodoListReactTS.BusinessLayer.Interfaces;
using OKTodoListReactTS.BusinessLayer.Mapping;
using OKTodoListReactTS.BusinessLayer.Services;
using OKTodoListReactTS.Common.Logging;

namespace OKTodoListReactTS.Api
{
    public class Startup
    {
        internal const string ConfigKeyAppInsights = "APPLICATIONINSIGHTS_INSTRUMENTATIONKEY";
        internal const string ConfigSectionAzureAd = "AzureAd";
        internal const string ConfigSectionBlobStorage = "BlobStorage";
        internal const string ConfigSectionDatabase = "Database";

        public readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            ConfigureLogging();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureApplicationInsights(services);

            ConfigureAuthentication(services);

            RegisterDependencies(services);

            services.AddSingleton(Configuration);
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddControllers().AddNewtonsoftJson();

            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireRole("App.Read") // Requires the most basic role - that is, using the app.
                    .Build();

                options.Filters.Add(new AuthorizeFilter(policy));

                options.SuppressAsyncSuffixInActionNames = false;
                options.AddDefaultResultConvention();
            }).AddFluentValidation();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OKTemplate REST API", Version = "v1" });
                // Link to docs: https://docs.telerik.com/reporting/knowledge-base/conflicting-actions-error-in-swagger-generation-net-core#swashbuckle
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                c.IgnoreObsoleteActions();
                c.IgnoreObsoleteProperties();

                var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                var oAuthBaseUrl = string.Format("https://login.microsoftonline.com/{0}/oauth2/v2.0", Configuration["AzureAd:TenantId"]);

                c.IncludeXmlComments(xmlPath);
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        AuthorizationCode = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri($"{oAuthBaseUrl}/authorize"),
                            TokenUrl = new Uri($"{oAuthBaseUrl}/token"),
                            Scopes = new Dictionary<string, string>
                            {
                                { $"api://{Configuration["AzureAd:ClientId"]}/ReadWrite", "Access to API" }
                            }
                        }
                    }
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "oauth2"
                            },
                            Scheme = "oauth2",
                            Name = "oauth2",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
            });

            services.AddHttpContextAccessor();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });

        }

        /// <summary>
        /// Configures the given <paramref name="app"/> in a given <paramref name="env"/>
        /// </summary>
        /// <param name="app">The app to be configured</param>
        /// <param name="env">The environment the app runs in</param>
        /// <param name="loggerManager">Manages logs</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerManager loggerManager)
        {
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                var t = Configuration["AzureAd"];
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OKTemplate REST API");
                c.OAuthClientId(Configuration["AzureAd:ClientId"]);
                c.OAuthRealm(Configuration["AzureAd:ClientId"]);
                c.OAuthUsePkce();
                c.RoutePrefix = "docs";
                c.EnableTryItOutByDefault();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Handle Exceptions our way
            app.ConfigureExceptionHandler(loggerManager);

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            var supportedCultures = new[] { "de-DE", "en-US" };

            var localizationOptions = new RequestLocalizationOptions().SetDefaultCulture(supportedCultures[0])
                .AddSupportedCultures(supportedCultures)
                .AddSupportedUICultures(supportedCultures);
            app.UseRequestLocalization(localizationOptions);

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        private static void RegisterDependencies(IServiceCollection services)
        {
            // Auto Mapper Configurations
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            //Hier werden die Services registriert

            services.AddSingleton<ILoggerManager, LoggerManager>();

            services.AddTransient<IToDoService, ToDoService>();

            services.AddTransient<IGraphApiService, GraphApiService>();

            services.AddLocalization(o => { o.ResourcesPath = "Resources"; });
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddMicrosoftIdentityWebApi(Configuration.GetSection(ConfigSectionAzureAd))
                    .EnableTokenAcquisitionToCallDownstreamApi()
                    .AddDownstreamWebApi("GraphApi", Configuration.GetSection("GraphApi"))
                    .AddInMemoryTokenCaches();
        }

        private static void ConfigureApplicationInsights(IServiceCollection services)
        {
            ApplicationInsightsServiceOptions applicationOptions = new();

            applicationOptions.RequestCollectionOptions.TrackExceptions = true;

            // Enable distributed tracing
            System.Diagnostics.Activity.DefaultIdFormat = System.Diagnostics.ActivityIdFormat.W3C;

            services.AddApplicationInsightsTelemetry(applicationOptions);
        }

        private void ConfigureLogging()
        {
            var config = new LoggingConfiguration();

            // Log to ApplicationInsights
            ApplicationInsightsTarget applicationInsightsTarget = new()
            {
                InstrumentationKey = Configuration[ConfigKeyAppInsights]
            };

            LoggingRule applicationInsightsRule = new("*", LogLevel.Warn, applicationInsightsTarget);

            // Log to console
            ConsoleTarget consoleTarget = new();

            LoggingRule consoleRule = new("*", LogLevel.Debug, consoleTarget);

            config.LoggingRules.Add(consoleRule);
            config.LoggingRules.Add(applicationInsightsRule);

            LogManager.Configuration = config;
        }
    }
}