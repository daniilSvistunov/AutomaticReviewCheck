using System;
using System.Linq;
using AutoMapper.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using OKTodoListReactTS.Api.Controllers;
using Xunit;

namespace OKTodoListReactTS.Api.Tests
{
    public class EndpointNamingTest
    {
        [Fact]
        public void CheckEndpoints_AllAreCorrectlyNamed()
        {
            // Arrange
            var controllerMethods = typeof(VersionController).Assembly
                .GetTypes()
                .Where(t => t.GetCustomAttributes(typeof(ApiControllerAttribute), true).Any())
                .SelectMany(t => t.GetMethods())
                .Select(m => new { Method = m, HttpAttribute = m.GetCustomAttributes(true).OfType<HttpMethodAttribute>().FirstOrDefault() })
                .Where(ma => ma.HttpAttribute != null)
                .ToList();

            // Act
            var methodsWithoutName = controllerMethods
                .Where(ma => string.IsNullOrWhiteSpace(ma.HttpAttribute!.Name))
                .Select(ma => $"endpoint {ma.Method.DeclaringType!.Name}.{ma.Method.Name} doesn't have a Name")
                .ToList();
            var methodsWithWrongName = controllerMethods
                .Where(ma => !string.IsNullOrWhiteSpace(ma.HttpAttribute!.Name))
                .Where(ma => ma.HttpAttribute!.Name != ma.Method.Name)
                .Select(ma => $"Name '{ma.HttpAttribute!.Name}' of endpoint {ma.Method.DeclaringType!.Name}.{ma.Method.Name} doesn't match the method's name")
                .ToList();

            // Assert
            var errors = methodsWithoutName.Concat(methodsWithWrongName).ToList();
            if (errors.Count > 0)
            {
                Assert.True(false, string.Join(Environment.NewLine, errors));
            }
        }
    }
}