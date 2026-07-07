import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Gender = 'male' | 'female';

export interface Player {
    id: string;
    name: string;
    age: number | null;
    weight: number | null;
    gender: Gender;
    status: 'active' | 'finished';
    finalSpeed: number | null;
    vo2max: number | null;
    dropOutTime?: string | null;
}

const STORAGE_KEY = 'ift_squad_players';

// Initialize with data from local storage if available
const initialPlayers: Player[] = browser 
    ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') 
    : [];

export const playersStore = writable<Player[]>(initialPlayers);

// Subscribe to changes and save to local storage
if (browser) {
    playersStore.subscribe(players => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    });
}
