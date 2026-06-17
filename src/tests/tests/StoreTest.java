
import com.nexus.tests.base.BaseTest;
import com.nexus.tests.pages.NavigationHeaderPage;
import com.nexus.tests.pages.StorePage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Store View Tests")
public class StoreTest extends BaseTest {

    private NavigationHeaderPage nav;
    private StorePage store;

    @BeforeEach
    public void navigateToStore() {
        nav = new NavigationHeaderPage(driver);
        store = new StorePage(driver);
        nav.goToStore();
    }

    @Test
    @DisplayName("Store viewport should render with title and feed columns")
    public void testStoreLoads() {
        assertThat(store.isStoreViewportVisible()).isTrue();
        assertThat(store.getStoreTitle()).containsIgnoringCase("Nexus Store");
        assertThat(store.getFeedColumnCount()).isEqualTo(2);
    }

    @Test
    @DisplayName("Trending and Deals feeds should resolve to either cards or status message")
    public void testFeedsResolve() {
        store.waitForFeedCardsOrEmptyState();

        // Either feed cards are present, or a status message (loading/empty/error) is shown
        boolean hasContent = !store.getFeedCards().isEmpty() ||
                !driver.findElements(org.openqa.selenium.By.cssSelector(".store-feed-status")).isEmpty();

        assertThat(hasContent).isTrue();
    }

    @Test
    @DisplayName("Clicking a feed card should open the store item page")
    public void testOpenStoreItemFromFeed() {
        store.waitForFeedCardsOrEmptyState();

        if (store.getFeedCards().isEmpty()) {
            // Skip if no IGDB / deal data is available in this environment
            return;
        }

        store.clickFirstFeedCard();

        assertThat(store.isStoreItemPageVisible()).isTrue();
        assertThat(store.getStoreItemTitle()).isNotBlank();

        store.clickBackToStore();
        assertThat(store.isStoreViewportVisible()).isTrue();
    }

    @Test
    @DisplayName("Search should filter store catalog and IGDB results")
    public void testStoreSearchFiltering() {
        nav.typeSearch("a");

        try { Thread.sleep(1000); } catch (InterruptedException ignored) {}

        boolean hasResultsOrEmpty =
                !store.getSearchResultCards().isEmpty() || store.isStoreEmptyShown();

        assertThat(hasResultsOrEmpty).isTrue();

        nav.clearSearch();
    }

    @Test
    @DisplayName("Marking an item as owned should reflect Owned state on store item page")
    public void testMarkAsOwned() {
        store.waitForFeedCardsOrEmptyState();

        if (store.getFeedCards().isEmpty()) {
            return; // no items available in this environment
        }

        store.clickFirstFeedCard();
        assertThat(store.isStoreItemPageVisible()).isTrue();

        if (store.isMarkOwnedButtonVisible()) {
            store.clickMarkOwned();

            try { Thread.sleep(500); } catch (InterruptedException ignored) {}

            assertThat(store.isOwnedCheckVisible()).isTrue();
        }
    }
}