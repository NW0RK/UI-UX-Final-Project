

import com.nexus.tests.base.BaseTest;
import com.nexus.tests.pages.NavigationHeaderPage;
import com.nexus.tests.pages.SettingsPage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Settings Panel Tests")
public class SettingsTest extends BaseTest {

    private SettingsPage settings;

    @BeforeEach
    public void openSettingsPanel() {
        NavigationHeaderPage nav = new NavigationHeaderPage(driver);
        nav.openSettings();

        settings = new SettingsPage(driver);
        settings.waitUntilOpen();
    }

    @Test
    @DisplayName("Settings modal should open from header gear icon")
    public void testSettingsOpens() {
        assertThat(settings.isOpen()).isTrue();
    }

    @Test
    @DisplayName("Selecting a theme should mark it active")
    public void testThemeSelection() {
        settings.selectTheme("Cyber Glitch");

        assertThat(settings.isThemeActive("Cyber Glitch")).isTrue();
        assertThat(settings.isThemeActive("Aether Core")).isFalse();

        // restore default
        settings.selectTheme("Aether Core");
        assertThat(settings.isThemeActive("Aether Core")).isTrue();
    }

    @Test
    @DisplayName("Toggling audio mute should update aria-checked state")
    public void testAudioToggle() {
        boolean initialMuted = settings.isAudioMuted();

        settings.toggleAudio();
        boolean afterToggle = settings.isAudioMuted();

        assertThat(afterToggle).isNotEqualTo(initialMuted);


        settings.toggleAudio();
    }

    @Test
    @DisplayName("Adjusting panel blur slider should update its value")
    public void testPanelBlurSlider() {
        settings.setPanelBlur(35);

        assertThat(settings.getPanelBlurValue()).isEqualTo("35");
    }

    @Test
    @DisplayName("Closing settings via Done button should hide the modal")
    public void testCloseSettingsWithDone() {
        settings.clickDone();

        try { Thread.sleep(300); } catch (InterruptedException ignored) {}

        assertThat(settings.isOpen()).isFalse();
    }
}