package com.nexus.tests;

import com.nexus.tests.base.BaseTest;
import com.nexus.tests.pages.LibraryPage;
import com.nexus.tests.pages.NavigationHeaderPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Library View Tests")
public class LibraryTest extends BaseTest {

    @Test
    @DisplayName("Library banner should display selected game info")
    public void testBannerDisplaysGame() {
        LibraryPage library = new LibraryPage(driver);

        assertThat(library.isBannerVisible()).isTrue();
        assertThat(library.hasBannerTitleOrLogo()).isTrue();
    }

    @Test
    @DisplayName("Play button should toggle to Running state on click")
    public void testPlayButtonTogglesRunningState() throws InterruptedException {
        LibraryPage library = new LibraryPage(driver);

        String initialText = library.getPlayButtonText();
        assertThat(initialText).containsIgnoringCase("Play Game");

        library.clickPlay();
        Thread.sleep(500);

        String afterClickText = library.getPlayButtonText();
        assertThat(afterClickText).containsIgnoringCase("Running");
    }

    @Test
    @DisplayName("Favorite toggle should change active state on banner")
    public void testFavoriteToggle() {
        LibraryPage library = new LibraryPage(driver);

        boolean initialState = library.isFavoriteActive();
        library.clickFavoriteToggle();
        boolean toggledState = library.isFavoriteActive();

        assertThat(toggledState).isNotEqualTo(initialState);

        library.clickFavoriteToggle();
    }

    @Test
    @DisplayName("Horizontal library shelf should list games and allow selection")
    public void testLibraryShelfSelection() {
        LibraryPage library = new LibraryPage(driver);

        List<String> titles = library.getLibraryGameTitles();
        assertThat(titles).isNotEmpty();

        String firstTitle = titles.get(0);
        library.selectGameByTitle(firstTitle);

        assertThat(library.isCardSelected(firstTitle)).isTrue();
    }

    @Test
    @DisplayName("Library count badge should match number of game cards")
    public void testLibraryCountMatchesCards() {
        LibraryPage library = new LibraryPage(driver);

        int cardCount = library.getLibraryCards().size();
        String countText = library.getLibraryCountText();

        assertThat(countText).contains(String.valueOf(cardCount));
    }
}