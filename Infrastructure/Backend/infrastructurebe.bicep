param env string
param plattformUri string
param appInsightsName string = 'appi-okp-okorder-${env}' #TODO appi-okp-ok$name$-${env}
param appServiceName string = 'app-okp-okorder-${env}'   #TODO app-okp-ok$name$-${env}
param appServicePlanName string = 'asp-okp-back01-${env}' 
param logWorkspaceName string = 'log-okp-back01-${env}'
param keyVaultName string = 'kv-okp-back01-${env}' #TODO add client secret in KV
param locationName string = 'germanywestcentral'
param azureAdClientId string
param aadLoginUrl string
#Define dependent APIs 
param abrechnungAPIClientScopes string
param capacityAPIClientScopes string
param teamserviceAPIClientScopes string

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' existing = {
  name: logWorkspaceName
}

resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' existing = {
  name: appServicePlanName
}

resource keyVault 'Microsoft.KeyVault/vaults@2021-04-01-preview' existing = {
  name: keyVaultName
}

@description('This is the built-in Key Vault Secret User role. See https://docs.microsoft.com/azure/role-based-access-control/built-in-roles#key-vault-secrets-user')
resource keyVaultSecretUserRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  name: '4633458b-17de-408a-b874-0445c86b69e6'
}

resource appInsights 'microsoft.insights/components@2020-02-02' = {
  name: appInsightsName
  location: locationName
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaWebAppExtensionCreate'
    RetentionInDays: 90
    WorkspaceResourceId: logAnalyticsWorkspace.id
    IngestionMode: 'Disabled'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: appServiceName
  location: locationName
  kind: 'app'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    serverFarmId: appServicePlan.id
    reserved:false
    isXenon:false
    hyperV:false
    vnetRouteAllEnabled:false
    vnetImagePullEnabled:false
    vnetContentShareEnabled:false
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: true
      http20Enabled: false
      minTlsVersion: '1.2'
      scmMinTlsVersion: '1.2'
      ftpsState:'FtpsOnly'
      netFrameworkVersion: 'v7.0'
      cors: {
        allowedOrigins: [ #TODO declare allowedOrigins
          'https://stokpokorder${env}.z1.web.core.windows.net'
          'https://localhost:3000'
          'https://localhost:3005'
          plattformUri
        ]
        supportCredentials: false
      }
      virtualApplications: [
        {
          virtualPath: '/'
          physicalPath: 'site\\wwwroot'
          preloadEnabled:true
        }
      ]
      appSettings: [ #TODO declare Appsettings -Example Appsettings-
        {
          name: 'OKAbrechnungBackendExternalApiClient:BaseUrl'
          value: 'https://app-okabrechnung-${env}.azurewebsites.net'
        }
        {
          name: 'OKAbrechnungBackendExternalApiClient:Scopes'
          value: abrechnungAPIClientScopes
        }
        {
          name: 'OKCapacityServiceExternalApiClient:BaseUrl'
          value: 'https://app-okp-okcapacity-service-${env}.azurewebsites.net'
        }
        {
          name: 'OKCapacityServiceExternalApiClient:Scopes'
          value: capacityAPIClientScopes
        }
        {
          name: 'OKTeamserviceApiClient:BaseUrl'
          value: 'https://app-okteamservice-${env}.azurewebsites.net'
        }
        {
          name: 'OKTeamserviceApiClient:Scopes'
          value: teamserviceAPIClientScopes
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'APPINSIGHTS_PROFILERFEATURE_VERSION'
          value: '1.0.0'
        }
        {
          name: 'APPINSIGHTS_SNAPSHOTFEATURE_VERSION'
          value: '1.0.0'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~2'
        }
        {
          name: 'AzureAd:ClientId'
          value: azureAdClientId
        }
        {
          name: 'AzureAd:ClientSecret'
          value: '@Microsoft.KeyVault(SecretUri=${keyVault.properties.vaultUri}secrets/$KeyVault secret name$)' #TODO secret Name 
        }
        {
          name: 'AzureAd:Domain'
          value: 'objektkultur365.onmicrosoft.com'
        }
        {
          name: 'AzureAd:Instance'
          value: aadLoginUrl
        }
        {
          name: 'AzureAd:TenantId'
          value: 'd0ad5c73-02ef-443c-b087-e21b8953e0ac'
        }
        {
          name: 'DiagnosticServices_EXTENSION_VERSION'
          value: '~3'
        }
        {
          name: 'GraphApi:BaseUrl'
          value: 'https://graph.microsoft.com/v1.0'
        }
        {
          name: 'GraphApi:Scopes'
          value: 'User.Read User.Read.All Tasks.ReadWrite Group.ReadWrite.All GroupMember.Read.All'
        }
        {
          name: 'InstrumentationEngine_EXTENSION_VERSION'
          value: 'disabled'
        }
        {
          name: 'SnapshotDebugger_EXTENSION_VERSION'
          value: 'disabled'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_BaseExtensions'
          value: 'disabled'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_Java'
          value: '1'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_Mode'
          value: 'recommended'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_NodeJS'
          value: '1'
        }
        {
          name: 'XDT_MicrosoftApplicationInsights_PreemptSdk'
          value: 'disabled'
        }
      ]
    }
    scmSiteAlsoStopped:false
    clientAffinityEnabled:true
    clientCertMode:'Required'
    hostNamesDisabled:false
    containerSize:0
    dailyMemoryTimeQuota:0
    httpsOnly:true
    redundancyMode:'None'
    publicNetworkAccess:'Enabled'
    storageAccountRequired:false
    keyVaultReferenceIdentity:'SystemAssigned'
  }
}

resource keyVaultSecretUserRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-08-01-preview' = {
  scope: keyVault
  name: guid(resourceGroup().id, appService.id, keyVaultSecretUserRoleDefinition.id)
  properties: {
    roleDefinitionId: keyVaultSecretUserRoleDefinition.id
    principalId: appService.identity.principalId
    principalType: 'ServicePrincipal'
  }
}
