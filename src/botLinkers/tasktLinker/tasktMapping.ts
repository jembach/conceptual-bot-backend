export interface TasktCommand {
  command: string;
}

const tasktMapping: Record<string, TasktCommand> = {
  ExcelOpenWorkbook: { command: "ExcelOpenWorkbookCommand" },
  ExcelReadCellValue: { command: "ExcelGetCellCommand" },
  BinaryDecision: { command: "BinaryDecision" },
  OutlookGetEmails: { command: "OutlookGetEmailsCommand" },
  OutlookSendEmail: { command: "OutlookEmailCommand" },
  BrowserOpen: { command: "SeleniumBrowserCreateCommand" },
  BrowserOpenURL: { command: "SeleniumBrowserNavigateURLCommand" },
  BrowserGetText: { command: "SeleniumBrowserElementActionCommand" },
  BrowserClose: { command: "SeleniumBrowserCloseCommand" },
  CreateFile: { command: "WriteTextFileCommand" },
  AppendTextToFile: { command: "WriteTextFileCommand" },
};

export default tasktMapping;
