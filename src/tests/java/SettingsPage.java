
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class SettingsPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By overlay = By.cssSelector(".settings-overlay");
    private final By modal = By.cssSelector(".settings-modal");
    private final By closeBtn = By.cssSelector(".settings-close-btn");
    private final By doneBtn = By.xpath("//div[@class='settings-footer flex-center-end']//button[contains(.,'Done')]");
    private final By themePills = By.cssSelector(".theme-pill-btn");
    private final By audioToggle = By.xpath("//div[contains(@class,'audio-toggle-card')][.//span[contains(text(),'Launcher Sounds')]]");
    private final By resetDbBtn = By.cssSelector(".reset-db-btn");
    private final By clearCacheBtn = By.cssSelector(".clear-cache-btn");
    private final By panelBlurSlider = By.xpath("//div[.//span[contains(text(),'Panel Blur')]]//input[@type='range']");

    public SettingsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public boolean isOpen() {
        return !driver.findElements(modal).isEmpty();
    }

    public void waitUntilOpen() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(modal));
    }

    public void close() {
        wait.until(ExpectedConditions.elementToBeClickable(closeBtn)).click();
    }

    public void clickDone() {
        wait.until(ExpectedConditions.elementToBeClickable(doneBtn)).click();
    }

    public void selectTheme(String themeLabel) {
        List<WebElement> pills = driver.findElements(themePills);
        for (WebElement pill : pills) {
            if (pill.getText().toUpperCase().contains(themeLabel.toUpperCase())) {
                pill.click();
                return;
            }
        }
        throw new IllegalArgumentException("Theme not found: " + themeLabel);
    }

    public boolean isThemeActive(String themeLabel) {
        List<WebElement> pills = driver.findElements(themePills);
        for (WebElement pill : pills) {
            if (pill.getText().toUpperCase().contains(themeLabel.toUpperCase())) {
                return pill.getAttribute("class").contains("active");
            }
        }
        return false;
    }

    public void toggleAudio() {
        wait.until(ExpectedConditions.elementToBeClickable(audioToggle)).click();
    }

    public boolean isAudioMuted() {
        WebElement card = driver.findElement(audioToggle);
        return card.getAttribute("aria-checked").equals("false");
    }

    public void setPanelBlur(int value) {
        WebElement slider = wait.until(ExpectedConditions.presenceOfElementLocated(panelBlurSlider));
        ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
                "arguments[0].value = arguments[1]; " +
                        "arguments[0].dispatchEvent(new Event('input', { bubbles: true }));" +
                        "arguments[0].dispatchEvent(new Event('change', { bubbles: true }));",
                slider, value);
    }

    public String getPanelBlurValue() {
        WebElement slider = driver.findElement(panelBlurSlider);
        return slider.getAttribute("value");
    }
}