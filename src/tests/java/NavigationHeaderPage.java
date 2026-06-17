import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class NavigationHeaderPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By logo = By.className("nexus-logo");
    private final By storeTab = By.xpath("//button[contains(@class,'mode-tab') and normalize-space()='Store']");
    private final By libraryTab = By.xpath("//button[contains(@class,'mode-tab') and normalize-space()='Library']");
    private final By favouritesTab = By.xpath("//button[contains(@class,'mode-tab') and normalize-space()='Favourites']");
    private final By searchInput = By.cssSelector(".search-input");
    private final By searchClearBtn = By.cssSelector(".search-clear-btn");
    private final By settingsBtn = By.cssSelector(".nav-icon-btn");
    private final By profileSection = By.cssSelector(".profile-user-section");
    private final By liveClock = By.cssSelector(".live-clock");
    private final By cpuTelemetry = By.xpath("//span[contains(@class,'telemetry-text') and contains(text(),'CPU')]");
    private final By ramTelemetry = By.xpath("//span[contains(@class,'telemetry-text') and contains(text(),'RAM')]");

    public NavigationHeaderPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isLogoVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(logo)).isDisplayed();
    }

    public void clickLogo() {
        driver.findElement(logo).click();
    }

    public void goToStore() {
        wait.until(ExpectedConditions.elementToBeClickable(storeTab)).click();
    }

    public void goToLibrary() {
        wait.until(ExpectedConditions.elementToBeClickable(libraryTab)).click();
    }

    public void goToFavourites() {
        wait.until(ExpectedConditions.elementToBeClickable(favouritesTab)).click();
    }

    public boolean isTabActive(String tabName) {
        WebElement tab = driver.findElement(
                By.xpath("//button[contains(@class,'mode-tab') and normalize-space()='" + tabName + "']"));
        return tab.getAttribute("class").contains("active");
    }

    public void typeSearch(String query) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(searchInput));
        input.click();
        input.clear();
        input.sendKeys(query);
    }

    public String getSearchValue() {
        return driver.findElement(searchInput).getAttribute("value");
    }

    public void clearSearch() {
        if (isClearButtonVisible()) {
            driver.findElement(searchClearBtn).click();
        }
    }

    public boolean isClearButtonVisible() {
        return !driver.findElements(searchClearBtn).isEmpty();
    }

    public void openSettings() {
        wait.until(ExpectedConditions.elementToBeClickable(settingsBtn)).click();
    }

    public void openProfile() {
        wait.until(ExpectedConditions.elementToBeClickable(profileSection)).click();
    }

    public String getClockText() {
        return driver.findElement(liveClock).getText();
    }

    public boolean isCpuTelemetryVisible() {
        return !driver.findElements(cpuTelemetry).isEmpty();
    }

    public boolean isRamTelemetryVisible() {
        return !driver.findElements(ramTelemetry).isEmpty();
    }
}