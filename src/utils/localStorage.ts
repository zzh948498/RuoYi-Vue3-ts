import { LocalStorage } from '@zeronejs/utils';
interface LocalStorageEntities {
    importForm: {
        url: string;
        schema: string;
    };
}
export const zeroneLocalStorage = new LocalStorage<LocalStorageEntities>();
