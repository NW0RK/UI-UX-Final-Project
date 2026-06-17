
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class LibraryPage {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private final By bannerContainer = By.cssSelector(".game-main-banner-container");
    private final By bannerTitle = By.cssSelector(".banner-game-title");
    private final By bannerLogo = By.cssSelector(".banner-logo-img");
    private final By playButton = By.cssSelector(".play-game-btn");
    private final By favoriteButton = By.cssSelector(".fav-pill-btn");
    private final By overflowTrigger = By.cssSelector(".banner-overflow-trigger");

    private final By shelf = By.cssSelector(".horizontal-library-shelf");
    private final By libraryCards = By.cssSelector(".library-card");
    private final By libraryCardTitles = By.cssSelector(".library-card-title");
    private final By libraryCount = By.cssSelector(".library-count");

    public LibraryPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public boolean isBannerVisible() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(bannerContainer)).isDisplayed();
    }

    public boolean hasBannerTitleOrLogo() {
        return !driver.findElements(bannerTitle).isEmpty() || !driver.findElements(bannerLogo).isEmpty();
    }

    public void clickPlay() {
        wait.until(ExpectedConditions.elementToBeClickable(playButton)).click();
    }

    public String getPlayButtonText() {
        return driver.findElement(playButton).getText();
    }

    public void clickFavoriteToggle() {
        wait.until(ExpectedConditions.elementToBeClickable(favoriteButton)).click();
    }

    public boolean isFavoriteActive() {
        return driver.findElement(favoriteButton).getAttribute("class").contains("active-favorite");
    }

    public void openOverflowMenu() {
        wait.until(ExpectedConditions.elementToBeClickable(overflowTrigger)).click();
    }

    public List<WebElement> getLibraryCards() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(shelf));
        return driver.findElements(libraryCards);
    }

    public List<String> getLibraryGameTitles() {
        return driver.findElements(libraryCardTitles)
                .stream()
                .map(WebElement::getText)
                .toList();
    }

    public String getLibraryCountText() {
        return driver.findElement(libraryCount).getText();
    }

    public void selectGameByTitle(String title) {
        List<WebElement> cards = getLibraryCards();
        for (WebElement card : cards) {
            WebElement titleEl = card.findElement(libraryCardTitles);
            if (titleEl.getText().trim().equalsIgnoreCase(title.trim())) {
                card.click();
                return;
            }
        }
        throw new IllegalArgumentException("Game not found in library: " + title);
    }

    public boolean isCardSelected(String title) {
        List<WebElement> cards = getLibraryCards();
        for (WebElement card : cards) {
            WebElement titleEl = card.findElement(libraryCardTitles);
            if (titleEl.getText().trim().equalsIgnoreCase(title.trim())) {
                return card.getAttribute("class").contains("selected");
            }
        }
        return false;
    }
}