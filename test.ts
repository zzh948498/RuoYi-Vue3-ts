import { readdir, stat, rename } from 'fs-extra';
import { join } from 'path';
const bootS = async (dir = './src', base = '') => {
    const dirName = join(base, dir);
    const dirs = await readdir(dirName);
    for (const names of dirs) {
        const fileName = join(dirName,names)
        if (await _isDir(fileName)) {
            bootS(names, dirName);
        } else if (names.endsWith('.js')) {
            rename(join(dirName, names), join(dirName, names.replace('.js', '.ts')));
        }
    }
};
bootS('./src',__dirname)

const _isDir = async (file: string): Promise<boolean> => {
    const stats = await stat(file);
    if (stats.isDirectory()) {
        return true;
    } else if (stats.isFile()) {
        return false;
    } else {
        throw new Error('路径不正确！');
    }
};
