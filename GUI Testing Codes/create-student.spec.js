// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('create student', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('create student', async function() {
    await driver.get("https://eexam-five.vercel.app/admin")
    await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.css(".create-student-button")).click()
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.id("firstname")).sendKeys("bhatt")
    await driver.findElement(By.id("middlename")).click()
    await driver.findElement(By.id("middlename")).sendKeys("aastha")
    await driver.findElement(By.id("lastname")).click()
    await driver.findElement(By.id("lastname")).sendKeys("sanjaybhai")
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("202201259@daiict.ac.in")
    await driver.findElement(By.id("contact")).click()
    await driver.findElement(By.id("contact")).sendKeys("9991254628")
    await driver.findElement(By.id("admissionYear")).sendKeys("2023")
    await driver.findElement(By.id("admissionYear")).click()
    await driver.findElement(By.id("admissionYear")).sendKeys("2022")
    await driver.findElement(By.id("admissionYear")).click()
    {
      const element = await driver.findElement(By.id("admissionYear"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    await driver.findElement(By.id("branch")).click()
    {
      const dropdown = await driver.findElement(By.id("branch"))
      await dropdown.findElement(By.xpath("//option[. = 'Information and Communication Technology']")).click()
    }
    await driver.findElement(By.css(".radio-group:nth-child(1) input:nth-child(2)")).click()
    await driver.findElement(By.name("studentType")).click()
    await driver.findElement(By.css(".submit-btn")).click()
    await driver.findElement(By.id("dob")).click()
    await driver.findElement(By.id("dob")).sendKeys("2024-11-05")
    await driver.findElement(By.css(".submit-btn")).click()
  })
})
