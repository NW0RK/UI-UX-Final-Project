
import com.nexus.tests.base.BaseTest;
import com.nexus.tests.pages.NavigationHeaderPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;

import static org.assertj.core.api.Assertions.assertThat;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DisplayName("Navigation Header Tests")
public class NavigationTest extends BaseTest {

    @Test
    @Order(1)
    @DisplayName("Logo and main tabs should be visible on load")
    public void testLogoAndTabsVisible() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        assertThat(nav.isLogoVisible()).isTrue();
        assertThat(nav.isTabActive("Library")).isTrue();
    }

    @Test
    @Order(2)
    @DisplayName("Should navigate to Store tab and update active state")
    public void testNavigateToStore() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        nav.goToStore();

        assertThat(nav.isTabActive("Store")).isTrue();
        assertThat(nav.isTabActive("Library")).isFalse();
    }

    @Test
    @Order(3)
    @DisplayName("Should navigate to Favourites tab")
    public void testNavigateToFavourites() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        nav.goToFavourites();

        assertThat(nav.isTabActive("Favourites")).isTrue();
    }

    @Test
    @Order(4)
    @DisplayName("Should return to Library tab via logo click")
    public void testLogoReturnsToLibrary() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        nav.goToStore();
        assertThat(nav.isTabActive("Store")).isTrue();

        nav.clickLogo();
        assertThat(nav.isTabActive("Library")).isTrue();
    }

    @Test
    @Order(5)
    @DisplayName("Search input should accept text and show clear button")
    public void testSearchInputAndClear() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        nav.typeSearch("Elden Ring");

        assertThat(nav.getSearchValue()).isEqualTo("Elden Ring");
        assertThat(nav.isClearButtonVisible()).isTrue();

        nav.clearSearch();
        assertThat(nav.getSearchValue()).isEmpty();
    }

    @Test
    @Order(6)
    @DisplayName("Live clock should display HH:MM AM/PM format")
    public void testLiveClockFormat() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        String clockText = nav.getClockText();

        assertThat(clockText).matches("^\\d{1,2}:\\d{2} (AM|PM)$");
    }

    @Test
    @Order(7)
    @DisplayName("CPU and RAM telemetry should be visible when system status tracking enabled")
    public void testTelemetryVisible() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);

        assertThat(nav.isCpuTelemetryVisible()).isTrue();
        assertThat(nav.isRamTelemetryVisible()).isTrue();
    }
}