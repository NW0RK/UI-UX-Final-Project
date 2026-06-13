

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class ControlCenterPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By drawerContainer = By.cssSelector(".control-center-drawer-container");
    private final By triggerHandle = By.cssSelector(".drawer-trigger-handle");
    private final By modeTabs = By.cssSelector(".cc-mode-tab");
    private final By quickPanel = By.cssSelector("#cc-panel-quick");
    private final By importPanel = By.cssSelector("#cc-panel-import");
    private final By diagnosticsPanel = By.cssSelector("#cc-panel-diagnostics");

    private final By importExeBtn = By.xpath("//button[@title='Import executable']");
    private final By fetchArtBtn = By.xpath("//button[@title='Fetch artwork for all games via SteamGridDB']");
    private final By settingsBtn = By.xpath("//button[@title='Open settings']");
    private final By powerOffBtn = By.xpath("//button[@title='Power off Windows']");

    private final By browsePathBtn = By.cssSelector(".browser-directory-btn");
    private final By scanBtn = By.cssSelector(".scan-action-btn");
    private final By scanResultsRows = By.cssSelector(".result-item-row");
    private final By importSelectedBtn = By.cssSelector(".import-submit-badge-btn");

    private final By clearDiagnosticsBtn = By.cssSelector(".diagnostics-clear-btn");
    private final By diagnosticRows = By.cssSelector(".diagnostic-row");

    public ControlCenterPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isOpen() {
        String classAttr = driver.findElement(drawerContainer).getAttribute("class");
        return classAttr.contains("drawer-open");
    }

    public void toggle() {
        wait.until(ExpectedConditions.elementToBeClickable(triggerHandle)).click();
    }

    public void openIfClosed() {
        if (!isOpen()) {
            toggle();
            wait.until(d -> isOpen());
        }
    }

    public void closeIfOpen() {
        if (isOpen()) {
            toggle();
            wait.until(d -> !isOpen());
        }
    }

    public void switchToMode(String label) {
        List<WebElement> tabs = driver.findElements(modeTabs);
        for (WebElement tab : tabs) {
            if (tab.getText().trim().toUpperCase().contains(label.toUpperCase())) {
                tab.click();
                return;
            }
        }
        throw new IllegalArgumentException("Mode tab not found: " + label);
    }

    public boolean isQuickPanelVisible() {
        return !driver.findElements(quickPanel).isEmpty();
    }

    public boolean isImportPanelVisible() {
        return !driver.findElements(importPanel).isEmpty();
    }

    public boolean isDiagnosticsPanelVisible() {
        return !driver.findElements(diagnosticsPanel).isEmpty();
    }

    public void clickImportExe() {
        wait.until(ExpectedConditions.elementToBeClickable(importExeBtn)).click();
    }

    public void clickFetchArtwork() {
        wait.until(ExpectedConditions.elementToBeClickable(fetchArtBtn)).click();
    }

    public void clickSettings() {
        wait.until(ExpectedConditions.elementToBeClickable(settingsBtn)).click();
    }

    public void clickPowerOff() {
        wait.until(ExpectedConditions.elementToBeClickable(powerOffBtn)).click();
    }

    public void clickBrowsePath() {
        wait.until(ExpectedConditions.elementToBeClickable(browsePathBtn)).click();
    }

    public void clickScanDirectory() {
        wait.until(ExpectedConditions.elementToBeClickable(scanBtn)).click();
    }

    public boolean isScanButtonEnabled() {
        return driver.findElement(scanBtn).isEnabled();
    }

    public List<WebElement> getScanResultRows() {
        return driver.findElements(scanResultsRows);
    }

    public void waitForScanResults() {
        wait.until(d -> !d.findElements(scanResultsRows).isEmpty());
    }

    public void clickImportSelected() {
        wait.until(ExpectedConditions.elementToBeClickable(importSelectedBtn)).click();
    }

    public void clearDiagnostics() {
        if (!driver.findElements(clearDiagnosticsBtn).isEmpty()) {
            driver.findElement(clearDiagnosticsBtn).click();
        }
    }

    public List<WebElement> getDiagnosticRows() {
        return driver.findElements(diagnosticRows);
    }
}