import * as components from '@element-plus/icons-vue';

export default {
    install: (app: any) => {
        for (const key in components) {
            const componentConfig = (components as any)[key];
            app.component(componentConfig.name, componentConfig);
        }
    },
};
