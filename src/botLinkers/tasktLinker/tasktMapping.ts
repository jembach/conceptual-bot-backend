export interface TasktCommand {
  command: string;
}

const tasktMapping: Record<string, TasktCommand> = {
  ExcelOpenWorkbook: { command: "ExcelOpenWorkbookCommand" },
  ExcelReadCellValue: { command: "ExcelGetCellCommand" },
  BinaryDecision: { command: "BinaryDecision" },
  OutlookOpen: { command: "" },
  OutlookGetEmails: { command: "OutlookGetEmailsCommand" },
  OutlookSendEmail: { command: "OutlookEmailCommand" },
  BrowserOpen: { command: "SeleniumBrowserCreateCommand" },
  BrowserOpenURL: { command: "SeleniumBrowserNavigateURLCommand" },
  BrowserGetText: { command: "SeleniumBrowserElementActionCommand" },
  BrowserClose: { command: "SeleniumBrowserCloseCommand" },
  CreateTextFile: { command: "WriteTextFileCommand" },
  AppendPlainText: { command: "WriteTextFileCommand" },
};

export default tasktMapping;
