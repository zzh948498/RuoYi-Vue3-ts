<script setup lang="ts">
import { makeMap } from '@/utils';
import { h, ref } from 'vue';
const props = defineProps({
    element: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    drawingList: {
        type: Array,
        required: true,
    },
    activeId: {
        type: Number,
        required: true,
    },
    formConf: {
        type: Object,
        required: true,
    },
});

const isAttr = makeMap(
    'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
        'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
        'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
        'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
        'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
        'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
        'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
        'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
        'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
        'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
        'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
        'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
        'target,title,type,usemap,value,width,wrap'
);

const render = () => {
    const dataObject: Record<string, any> = {
        attrs: {},
        props: {},
        on: {},
        style: {},
    };
    const confClone = JSON.parse(JSON.stringify(props.element));
    const children: any[] = [];
    Object.keys(confClone).forEach(key => {
        const val = confClone[key];
        if (dataObject.hasOwnProperty(key)) {
            dataObject[key] = val;
        } else if (!isAttr(key)) {
            dataObject.props[key] = val;
        } else {
            dataObject.attrs[key] = val;
        }
    });
    return h(props.element.tag, dataObject, children);
};
</script>
<template>
    <el-col>
    <el-form-item>
      

    </el-form-item>
    </el-col>
</template>
