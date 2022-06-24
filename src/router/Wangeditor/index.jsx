import React, { useEffect,useState } from 'react';
import styles from "./index.module.scss";
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

export default ()=>{
    const [editor,setEditor]=useState(null)
    const [html,setHtml]=useState(null)
    // 闭包陷阱
    const [count, setCount] = useState(0);
    console.log('render val:', count)

    useEffect(() => {
        let id = setInterval(() => {
        console.log('interval val:', count)
        setCount(val => val + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);


    
    const editorConfig= {
        placeholder: '富文本编辑器完成...',
    }

     // 及时销毁 editor ，重要！
     useEffect(() => {
        console.log('editor',editor);
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    useEffect(()=>{
        console.log('html',html);
    },[html])
    return (
        <>
            <div className={styles.title}>富文本编辑器</div>
            <div style={{ border: '1px solid #ccc', zIndex: 100,textAlign:'left',width:'1400px',margin:'0px auto'}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={{}}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', 'overflowY': 'hidden' }}
                />
            </div>
        </>
    )
}