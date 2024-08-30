

export function isMobileDevice() {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        return true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return true;
    }

    return false;
}

