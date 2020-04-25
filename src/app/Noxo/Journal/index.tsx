import React, {createContext, Fragment, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {Box, Divider, Fade, LinearProgress, Slide} from '@material-ui/core'
import sagaAction, {useSelector} from "@/store";
import TitleBlock from "../components/Title";
import JournalToolbar from "./Toolbar";
import JournalListView from "@/app/Noxo/Journal/List";
import {JournalState, NoteState} from "@/types/states";
import JournalGalleryView from "@/app/Noxo/Journal/Gallery";
import * as JOURNAL_ACT from "@/store/journal/actions";
import debounce from "lodash/debounce";

export const JournalContext = createContext({
	viewId: '',
	handleChangeView: (viewId: string) => {},
})

const handleSaveInfo = debounce((key: string, value: string) => {
	sagaAction({ type: JOURNAL_ACT.SAGA_UPDATE_INFO, payload: { [key]: value } })
}, 500, {maxWait: 5000})

const Journal = (props: React.ComponentProps<any>) => {
	const history = useHistory()
	const journalId = props.match.params.id
	const [viewId, setViewId] = useState(props.match.params.view)

	const { journal, views }: JournalState =
		useSelector(state => state.get('journal'))

	const handleChangeView = (viewId: string) => {
		setViewId(viewId)
	}

	useEffect(() => {
		sagaAction({ type: JOURNAL_ACT.SAGA_JOURNAL_READ, journalId: journalId })
	}, [journalId])

	useEffect(() => {
		if (!viewId && Array.isArray(views) && views[0])
			history.push(`/o/journal/${journalId}/${views[0]._id}`)
	}, [viewId, views, setViewId])

	let viewInfo = views.filter(x => x._id === viewId)
	return (
		<div>
			{viewId ?
				<JournalContext.Provider value={{
					viewId,
					handleChangeView
				}}>
					<Slide direction="up" in={journalId === journal._id && viewInfo.length > 0} timeout={500} mountOnEnter unmountOnExit>
						<Box>
							<Fade in={journalId === journal._id && viewInfo.length > 0} timeout={2000}>
								<Box>
									{viewInfo.length > 0 &&
										<Fragment>
											<TitleBlock
												title={journal.title}
												titleIcon={journal.titleIcon}
												onChange={handleSaveInfo}
											/>
											<JournalToolbar />
											<Divider />
											{viewInfo[0].type === 'list' && <JournalListView />}
											{viewInfo[0].type === 'board' && <JournalListView />}
											{viewInfo[0].type === 'gallery' && <JournalGalleryView viewId={viewId}/>}
											{viewInfo[0].type === 'table' && <JournalListView />}
										</Fragment>}
								</Box>
							</Fade>
						</Box>
					</Slide>
				</JournalContext.Provider>
				:
				null}
		</div>
	)
}


export default React.memo(
	Journal,
	(prev, next) =>
		prev.match.params.id === next.match.params.id && prev.match.params.view === next.match.params.view
)
