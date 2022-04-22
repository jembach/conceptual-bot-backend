export interface RobotFrameworkKeyword {
  library: string;
  keyword: string;
}

const robotFrameworkMapping: Record<string, RobotFrameworkKeyword> = {
  ExcelReadCellValue: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteGetEmails: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteReadCellValue: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteSendEmail: { library: "Excel.Application", keyword: "Read Cell" },
  BinaryDecision: { library: "Excel.Application", keyword: "Read Cell" },
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
  CreateFile: { library: "RPA.FileSystem", keyword: "Create File" },
  AppentTextToFile: { library: "RPA.FileSystem", keyword: "Append To File" },
};

export default robotFrameworkMapping;
