import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Polyfill structuredClone si no existe (usado por fake-indexeddb)
if (typeof (globalThis as any).structuredClone !== 'function') {
  (globalThis as any).structuredClone = (val: any) => JSON.parse(JSON.stringify(val));
}

// Polyfill IndexedDB en entorno de tests (debe ir tras structuredClone)
import 'fake-indexeddb/auto';

// Media query mock para Angular Material
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Evita timeouts en ambientes lentos
// eslint-disable-next-line no-undef
jest.setTimeout(30000);

// Silencia el DeprecationWarning del módulo "punycode" en Node durante los tests
const originalEmitWarning = process.emitWarning;
process.emitWarning = (warning: any, ...args: any[]) => {
  const msg = typeof warning === 'string' ? warning : warning?.message || '';
  if (typeof msg === 'string' && msg.includes('punycode module is deprecated')) {
    return;
  }
  return originalEmitWarning.call(process, warning as any, ...args as any);
};
