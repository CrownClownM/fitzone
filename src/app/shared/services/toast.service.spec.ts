import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';

describe('ToastService (Jest)', () => {
	let spectator: SpectatorService<ToastService>;
	let snackBar: MatSnackBar;

	const createService = createServiceFactory({
		service: ToastService,
		mocks: [MatSnackBar],
	});

		beforeEach(() => {
			spectator = createService();
			snackBar = spectator.inject(MatSnackBar);
			const mockOpen: any = snackBar.open as any;
			mockOpen?.mockClear?.();
		});

	function assertSnack(message: string, expectedClass: string) {
		expect(snackBar.open).toHaveBeenCalled();
		const mockOpen: any = snackBar.open as any;
		const call = mockOpen.mock.calls[0];
		const [msg, action, config] = call;

		expect(msg).toBe(message);
		expect(action).toBeUndefined();
			expect((config as any).horizontalPosition).toBe('right');
			expect((config as any).verticalPosition).toBe('top');

		const panel = (config as any).panelClass;
			if (Array.isArray(panel)) {
				expect(panel).toContain(expectedClass);
			} else {
				expect(String(panel)).toContain(expectedClass);
			}
	}

	it('should create', () => {
		expect(spectator.service).toBeTruthy();
	});

	it('showSuccess => success-toast', () => {
		spectator.service.showSuccess('OK');
		assertSnack('OK', 'success-toast');
	});

	it('showError => error-toast', () => {
		spectator.service.showError('ERR');
		assertSnack('ERR', 'error-toast');
	});

	it('showInfo => info-toast', () => {
		spectator.service.showInfo('INFO');
		assertSnack('INFO', 'info-toast');
	});

	it('showWarning => warning-toast', () => {
		spectator.service.showWarning('WARN');
		assertSnack('WARN', 'warning-toast');
	});
});

