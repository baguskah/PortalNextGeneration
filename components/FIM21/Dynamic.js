import dynamic from 'next/dynamic'

export const KTP = dynamic(import('./KTP'))
export const DataDiri = dynamic(import('./DataDiri'))
export const ChooseTunnel = dynamic(import('./ChooseTunnel'))
export const Question = dynamic(import('./Question'))
export const Thank = dynamic(import('./Thank'))