export interface RobotFrameworkKeyword {
  library: string;
  keyword: string;
}

const robotFrameworkMapping: Record<string, RobotFrameworkKeyword> = {
  ExcelReadCellValue: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteGetEmails: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteReadCellValue: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteSendEmail: { library: "Excel.Application", keyword: "Read Cell" },
  OutlookOpen: {
    library: "RPA.Outlook.Application",
    keyword: "Open Application",
  },
  OutlookGetEmails: {
    library: "RPA.Outlook.Application",
    keyword: "Get Emails",
  },
  OutlookSendEmail: {
    library: "RPA.Outlook.Application",
    keyword: "Send Email",
  },
  BrowserOpen: { library: "RPA.Browser.Selenium", keyword: "Open Browser" },
  BrowserOpenURL: { library: "RPA.Browser.Selenium", keyword: "Go To" },
  BrowserClose: { library: "RPA.Browser.Selenium", keyword: "Close Browser" },
  BrowserGetText: { library: "RPA.Browser.Selenium", keyword: "Get Text" },
  CreateTextFile: { library: "RPA.FileSystem", keyword: "Create File" },
  AppendPlainText: { library: "RPA.FileSystem", keyword: "Append To File" },
};

export default robotFrameworkMapping;
