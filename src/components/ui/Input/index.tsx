//Tipagem para as propriedades do inputs
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import styles from './styles.module.scss'

//É a interface para dizer que o ...rest é do tipo HTMLInputElement
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

//É a interface para dizer que o ...rest é do tipo HTMLTextAreaElement
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

/**
 * Componente input para ser implementado em varios lugares do projeto
 * ...rest = são as propriedades enviadas.
 */
export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest} />
    )
}

/**
 * Componente area de texto
 * ...rest = são as propriedades enviadas.
 */
export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}