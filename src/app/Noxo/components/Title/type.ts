export type TitleBlockChange = (key: 'title' | 'titleIcon' | 'description', value: string) => void
export type TitleBlockPropsType = {
    type?: 'journal' | 'note'
    title: string
    titleIcon: string
    description?: string
    onChange: TitleBlockChange
}