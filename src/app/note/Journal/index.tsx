import React, {createContext, useEffect, useState} from 'react'
import { Divider } from '@material-ui/core'
import action, {useSelector} from "@/store";
import * as noteAct from '@/store/note/action-declares'

import TitleBlock from "../components/Title";
import JournalToolbar from "./Toolbar";
import JournalListView from "@/app/note/Journal/List";
import {NoteState} from "@/store/note/types";

export const JournalContext = createContext({
	handleChangeView: (viewId: string) => {},
})

const Journal = (props: React.ComponentProps<any>) => {
	const jourId = props.match.params.id
	const view = props.match.params.view
	const [viewId, setViewId] = useState(view)

	const { curJournal }: NoteState = useSelector(state => state.get('note'))

	const handleChangeView = (viewId: string) => {
		setViewId(viewId)
	}

	useEffect(() => {
		if (curJournal.views.length)
			setViewId(view || curJournal.views[0].viewId)
	}, [view, curJournal, setViewId])

	useEffect(() => {
		action(noteAct.SAGA_READ_JOURNAL, jourId)
	}, [jourId])

	return (
		<div className="oxo-editor">
			<JournalContext.Provider value={{
				handleChangeView
			}}>
				<TitleBlock type="journal"/>
				{curJournal.views.some(x => x.viewId === viewId) &&
				<div>
					<JournalToolbar jourId={jourId} viewId={viewId}/>
					<Divider />
					<JournalListView viewId={viewId}/>
				</div>}
			</JournalContext.Provider>
		</div>
	)
}


export default React.memo(
	Journal,
	(prev, next) =>
		prev.match.params.id === next.match.params.id && prev.match.params.view === next.match.params.view
)
