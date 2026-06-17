
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class StorePage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By storeViewport = By.cssSelector(".store-viewport");
    private final By storeTitle = By.cssSelector(".store-title");
    private final By feedColumns = By.cssSelector(".store-feed-column");
    private final By feedCards = By.cssSelector(".store-feed-card");
    private final By searchCards = By.cssSelector(".store-card");
    private final By storeEmpty = By.cssSelector(".store-empty");
    private final By backToStoreBtn = By.cssSelector(".store-item-back-btn");
    private final By storeItemTitle = By.cssSelector(".store-item-title");
    private final By markOwnedBtn = By.cssSelector(".mark-owned-btn");
    private final By ownedCheck = By.cssSelector(".owned-check");
    private final By linkExeBtn = By.xpath("//button[.//span[contains(text(),'Link EXE') or contains(text(),'Change EXE')]]");

    public StorePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isStoreViewportVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(storeViewport)).isDisplayed();
    }

    public String getStoreTitle() {
        return driver.findElement(storeTitle).getText();
    }

    public int getFeedColumnCount() {
        return driver.findElements(feedColumns).size();
    }

    public List<WebElement> getFeedCards() {
        return driver.findElements(feedCards);
    }

    public void waitForFeedCardsOrEmptyState() {
        wait.until(d ->
                !d.findElements(feedCards).isEmpty() ||
                        !d.findElements(By.cssSelector(".store-feed-status")).isEmpty());
    }

    public void clickFirstFeedCard() {
        List<WebElement> cards = getFeedCards();
        if (cards.isEmpty()) {
            throw new IllegalStateException("No store feed cards available to click");
        }
        cards.get(0).click();
    }

    public List<WebElement> getSearchResultCards() {
        return driver.findElements(searchCards);
    }

    public boolean isStoreEmptyShown() {
        return !driver.findElements(storeEmpty).isEmpty();
    }

    public void clickFirstSearchCard() {
        List<WebElement> cards = getSearchResultCards();
        if (cards.isEmpty()) {
            throw new IllegalStateException("No search result cards available");
        }
        cards.get(0).click();
    }

    public boolean isStoreItemPageVisible() {
        return !driver.findElements(storeItemTitle).isEmpty();
    }

    public String getStoreItemTitle() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(storeItemTitle)).getText();
    }

    public void clickBackToStore() {
        wait.until(ExpectedConditions.elementToBeClickable(backToStoreBtn)).click();
    }

    public boolean isMarkOwnedButtonVisible() {
        return !driver.findElements(markOwnedBtn).isEmpty();
    }

    public void clickMarkOwned() {
        wait.until(ExpectedConditions.elementToBeClickable(markOwnedBtn)).click();
    }

    public boolean isOwnedCheckVisible() {
        return !driver.findElements(ownedCheck).isEmpty();
    }
}