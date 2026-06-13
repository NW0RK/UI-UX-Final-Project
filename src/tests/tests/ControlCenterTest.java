

import com.nexus.tests.base.BaseTest;
import com.nexus.tests.pages.ControlCenterPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Control Center Tests")
public class ControlCenterTest extends BaseTest {

    @Test
    @DisplayName("Control Center drawer should open and close via trigger handle")
    public void testDrawerToggle() {
        ControlCenterPage cc = new ControlCenterPage(driver);

        assertThat(cc.isOpen()).isFalse();

        cc.toggle();
        assertThat(cc.isOpen()).isTrue();

        cc.toggle();
        assertThat(cc.isOpen()).isFalse();
    }

    @Test
    @DisplayName("Quick mode should be default panel when drawer opens")
    public void testDefaultQuickPanel() {
        ControlCenterPage cc = new ControlCenterPage(driver);

        cc.openIfClosed();

        assertThat(cc.isQuickPanelVisible()).isTrue();
        assertThat(cc.isImportPanelVisible()).isFalse();
        assertThat(cc.isDiagnosticsPanelVisible()).isFalse();

        cc.closeIfOpen();
    }

    @Test
    @DisplayName("Switching to Import mode should show the import/scan panel")
    public void testSwitchToImportPanel() {
        ControlCenterPage cc = new ControlCenterPage(driver);

        cc.openIfClosed();
        cc.switchToMode("Import");

        assertThat(cc.isImportPanelVisible()).isTrue();
        assertThat(cc.isQuickPanelVisible()).isFalse();

        cc.closeIfOpen();
    }

    @Test
    @DisplayName("Switching to Diagnostics mode should show diagnostics panel with event log")
    public void testSwitchToDiagnosticsPanel() {
        ControlCenterPage cc = new ControlCenterPage(driver);

        cc.openIfClosed();
        cc.switchToMode("Diagnostics");

        assertThat(cc.isDiagnosticsPanelVisible()).isTrue();

        cc.closeIfOpen();
    }

    @Test
    @DisplayName("Scan button should be disabled until a directory path is selected")
    public void testScanButtonDisabledWithoutPath() {
        ControlCenterPage cc = new ControlCenterPage(driver);

        cc.openIfClosed();
        cc.switchToMode("Import");

        assertThat(cc.isScanButtonEnabled()).isFalse();

        cc.closeIfOpen();
    }

    @Test
    @DisplayName("Browsing a directory (mock) and scanning should return results in browser mode")
    public void testBrowseAndScanMockResults() throws InterruptedException {
        ControlCenterPage cc = new ControlCenterPage(driver);

        cc.openIfClosed();
        cc.switchToMode("Import");

        cc.clickBrowsePath();
        Thread.sleep(300);

        assertThat(cc.isScanButtonEnabled()).isTrue();

        cc.clickScanDirectory();

        cc.waitForScanResults();

        assertThat(cc.getScanResultRows()).isNotEmpty();

        cc.closeIfOpen();
    }
}