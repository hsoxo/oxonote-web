import React, {createContext, Fragment, useEffect, useState} from 'react'
import {Box, Divider, Fade, LinearProgress, Slide} from '@material-ui/core'
import action, {useSelector} from "@/store";
import noteAct from '@/store/note/actions'

import TitleBlock from "../components/Title";
import JournalToolbar from "./Toolbar";
import JournalListView from "@/app/Noxo/Journal/List";
import {NoteState} from "@/types/states";
import JournalGalleryView from "@/app/Noxo/Journal/Gallery";

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


	let viewInfo = curJournal.views.filter(x => x.viewId === viewId)
	console.log(viewInfo)
	return (
		<div className="oxo-editor">
			<JournalContext.Provider value={{
				handleChangeView
			}}>
				<Slide direction="up" in={jourId === curJournal._id && viewInfo.length > 0} timeout={500} mountOnEnter unmountOnExit>
					<Box>
						<Fade in={jourId === curJournal._id && viewInfo.length > 0} timeout={2000}>
							<Box>
								{viewInfo.length > 0 &&
									<Fragment>
										<TitleBlock type="journal"/>
										<JournalToolbar jourId={jourId} viewId={viewId}/>
										<Divider />
										{viewInfo[0].type === 'list' && <JournalListView viewId={viewId}/>}
										{viewInfo[0].type === 'board' && <JournalListView viewId={viewId}/>}
										{viewInfo[0].type === 'gallery' && <JournalGalleryView viewId={viewId}/>}
										{viewInfo[0].type === 'table' && <JournalListView viewId={viewId}/>}
									</Fragment>}
							</Box>
						</Fade>
					</Box>
				</Slide>
			</JournalContext.Provider>
		</div>
	)
}


export default React.memo(
	Journal,
	(prev, next) =>
		prev.match.params.id === next.match.params.id && prev.match.params.view === next.match.params.view
)
