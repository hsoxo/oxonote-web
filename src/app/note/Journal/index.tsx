import React, { useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import action, {useSelector} from "@/store";
import * as noteAct from '@/store/note/action-declares'

import TitleBlock from "../components/Title";
import JournalToolbar from "./Toolbar";
import JournalListView from "@/app/note/Journal/List";
import {NoteState} from "@/store/note/types";

const Journal = (props: React.ComponentProps<any>) => {
	const jourId = props.match.params.id
	const [viewId, setViewId] = useState('')

	const { curJournal }: NoteState = useSelector(state => state.get('note'))

	useEffect(() => {
		if (curJournal.views.length)
			setViewId(curJournal.views[0].viewId)
	}, [curJournal, setViewId])

	useEffect(() => {
		action(noteAct.SAGA_READ_JOURNAL, jourId)
	}, [jourId])

	return (
		<div className="oxo-editor">
			<React.Fragment>
				<TitleBlock type="journal"/>
				<div>
					<JournalToolbar jourId={jourId} viewId={viewId}/>
					<Divider />
					<JournalListView viewId={viewId}/>
				</div>
			</React.Fragment>
		</div>
	)
}

export default React.memo(
	Journal,
	(prev, next) => prev.match.params.id === next.match.params.id
)
