interface ImportMetaEnv {
  //config
  readonly VITE_AZURE_FRONTEND_CLIENT_ID: string;
  readonly VITE_AZURE_FRONTEND_TENANT_ID: string;
  readonly VITE_AZURE_BACKEND_SCOPE_ACCESS_AS_USER: string;
  readonly VITE_OKTEAMS_ID: string;

  //urls
  readonly VITE_AZURE_BACKEND_API_URL: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_OKPLATTFORM_URL: string;

  //endpoints
  readonly VITE_ENDPOINT_APPLICATION: string;
  readonly VITE_ENDPOINT_TEAMS: string;
  readonly VITE_ENDPOINT_INVOICES_INVOICEPDF: string;
  readonly VITE_ENDPOINT_INVOICESACCOUNTING: string;
  readonly VITE_ENDPOINT_INVOICE_PATCH: string;
  readonly VITE_ENDPOINT_INVOICES_ACTIVITYREPORT: string;
  readonly VITE_ENDPOINT_INVOICE: string;
  readonly VITE_ENDPOINT_DUNNING: string;
  readonly VITE_ENDPOINT_INVOICE_NEWINVOICEPDF: string;

  readonly VITE_ENDPOINT_ORDER: string;
  readonly VITE_ENDPOINT_ROLES_AND_RIGHTS: string;
  readonly VITE_ENDPOINT_EMPLOYEES: string;
  readonly VITE_ENDPOINT_OPPORTUNITIES: string;
  readonly VITE_ENDPOINT_TEAMS: string;
  readonly VITE_ENDPOINT_FEATURES: string;
  readonly VITE_ENDPOINT_MILESTONES: string;
  readonly VITE_ENDPOINT_CONSULTINGROLES: string;
  readonly VITE_ENDPOINT_CONSULTINGROLESORDER: string;
  readonly VITE_ENDPOINT_MILESTONES_FEATURES: string;
  readonly VITE_ENDPOINT_TEAMITERATIONS: string;
  readonly VITE_ENDPOINT_MILESTONES_ITERATIONS: string;
  readonly VITE_ENDPOINT_CAPACITIES: string;

  readonly VITE_ENDPOINT_TASK: string;
  readonly VITE_ENDPOINT_PROPERTIES: string;

  // GraphApi
  readonly VITE_GRAPH_API_SCOPE_USER_READ: string;
  readonly VITE_GRAPH_API_ENDPOINT_ME: string;
  readonly VITE_GRAPH_API_ENDPOINT_MY_AVATAR: string;
}
