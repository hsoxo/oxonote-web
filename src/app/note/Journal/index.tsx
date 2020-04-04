import React, { useRef, useEffect, useState } from 'react'
import { Divider } from '@material-ui/core'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { useInterval } from '@/utils/hooks'
import action from "@/store";
import * as noteAct from '@/store/note/action-declares'

import TitleBlock from "../components/Title";

const Notebook = (props: React.ComponentProps<any>) => {
	const jourId = props.match.params.id
	const [changed, toggleChanged] = useState(false)
	const [viewId, setViewId] = useState(null)

	const handleCreateNote = async () => {}

	const handleSetState = () => {}

	const handleViewCreate = () => {}

	const handleViewDelete = () => {}

	const handleViewChange = () => {}

	useInterval(() => {
		// if (changed) action(noteAct.SAGA_UPDATE_JOURNAL)
	}, 500)

	useEffect(() => {
		action(noteAct.SAGA_READ_JOURNAL, jourId)
	}, [jourId])

	return (
		<div className="oxo-editor">
			<React.Fragment>
				<TitleBlock type="journal"/>
				{/*<div>*/}
				{/*	<DatabaseToolbar onCreate={handleCreateNote} />*/}
				{/*	<Divider />*/}
				{/*	<DatabaseTable />*/}
				{/*</div>*/}
			</React.Fragment>
		</div>
	)
}

export default React.memo(
	Notebook,
	(prev, next) => prev.match.params.id === next.match.params.id
)
