export type VO2Rating = 'poor' | 'fair' | 'good' | 'excellent' | 'superior';

export function getVO2Rating(gender: 'male' | 'female', age: number, vo2max: number): { rating: VO2Rating, label: string } {
    if (gender === 'male') {
        if (age < 30) {
            if (vo2max < 35) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 42) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 47) return { rating: 'good', label: 'Gut' };
            if (vo2max < 52) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else if (age < 40) {
            if (vo2max < 33) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 40) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 45) return { rating: 'good', label: 'Gut' };
            if (vo2max < 50) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else if (age < 50) {
            if (vo2max < 31) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 37) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 42) return { rating: 'good', label: 'Gut' };
            if (vo2max < 47) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else {
            // 50+
            if (vo2max < 28) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 34) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 39) return { rating: 'good', label: 'Gut' };
            if (vo2max < 44) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        }
    } else {
        // female
        if (age < 30) {
            if (vo2max < 30) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 34) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 39) return { rating: 'good', label: 'Gut' };
            if (vo2max < 44) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else if (age < 40) {
            if (vo2max < 28) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 32) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 37) return { rating: 'good', label: 'Gut' };
            if (vo2max < 41) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else if (age < 50) {
            if (vo2max < 26) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 30) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 35) return { rating: 'good', label: 'Gut' };
            if (vo2max < 39) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        } else {
            // 50+
            if (vo2max < 24) return { rating: 'poor', label: 'Schlecht' };
            if (vo2max < 28) return { rating: 'fair', label: 'Mittelmaß' };
            if (vo2max < 32) return { rating: 'good', label: 'Gut' };
            if (vo2max < 36) return { rating: 'excellent', label: 'Exzellent' };
            return { rating: 'superior', label: 'Überragend' };
        }
    }
}

export interface VO2Thresholds {
    poor: number;
    fair: number;
    good: number;
    excellent: number;
    superior: number;
}

export function getVO2Thresholds(gender: 'male' | 'female', age: number): VO2Thresholds {
    if (gender === 'male') {
        if (age < 30) return { poor: 20, fair: 35, good: 42, excellent: 47, superior: 52 };
        if (age < 40) return { poor: 20, fair: 33, good: 40, excellent: 45, superior: 50 };
        if (age < 50) return { poor: 20, fair: 31, good: 37, excellent: 42, superior: 47 };
        return { poor: 20, fair: 28, good: 34, excellent: 39, superior: 44 };
    } else {
        if (age < 30) return { poor: 20, fair: 30, good: 34, excellent: 39, superior: 44 };
        if (age < 40) return { poor: 20, fair: 28, good: 32, excellent: 37, superior: 41 };
        if (age < 50) return { poor: 20, fair: 26, good: 30, excellent: 35, superior: 39 };
        return { poor: 20, fair: 24, good: 28, excellent: 32, superior: 36 };
    }
}
