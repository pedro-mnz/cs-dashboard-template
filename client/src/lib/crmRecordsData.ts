// CRM Records data — populated by Manus during setup from your CRM
// This file is refreshed daily by Manus.

export interface CRMRecord {
  id: string;
  client: string;
  type: string;
  date: string;
  title: string;
  status: string;
  owner: string;
}

export const crmRecords: CRMRecord[] = [];
