import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default async function getFingerprint() {
    try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    } catch (error) {
        return '';
    }
}
