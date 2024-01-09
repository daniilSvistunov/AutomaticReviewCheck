// import { InvoiceStatus } from '../models/invoice';

export type InvoiceApi = {
  id: string; //GUID
  salesorderNumber: string;
  salesorderId: string;
  // salesorderType: InvoiceOrderType;
  salesorderName: string;
  contactPerson: string;
  customerName: string;
  customerNumber: number;
  customerOrderNumber: string;

  // state: InvoiceStatus;
  /** Undefined means that `state` is the freshest value from the database.
   * If we store something in `state_old`, that means `state` is an optimistic value. */
  // state_old: undefined | InvoiceStatus;

  additionalTextBySalesorderSettings: string | null;
  firstInvoiceText: string | null;
  secondInvoiceText: string | null;
  invoicedOn: Date | null;
  /** The date when the invoice payment is due. */
  paymentTarget: Date | null;
  customerPaymentTarget: number | null;
  invoiceNumber: string;
  paidOn: Date | null;
  vat: number;
  netAmount: number;
  grossAmount: number;

  /** Accounting can adjust the target payment date, which can extend beyond PaymentTarget. */
  paymentTargetDunning: Date | null;
  // levelOfDunning: DunningLevel | null;
  isDunningActive: boolean;
  introductionDunning: string | null;
  endingDunning: string | null;

  invoiceRecipient: string;
  addressAddition: string;
  addressLine1: string;
  addressPostalCode: string;
  addressCity: string;
};

export type TargetActions = {
  targetId: string;
  targetName: string;

  canAccess: boolean;
  canRead: boolean;
  canWrite: boolean;
  canAdd: boolean;
  canDelete: boolean;
};
