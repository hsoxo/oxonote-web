import React from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PersonIcon from '@material-ui/icons/Person'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import EventNoteIcon from '@material-ui/icons/EventNote'
import * as Elements from '@/app/Noxo/Note/Attributes/Element'
//
import { NoteAttributeTypesObject } from "@/types/note-attribute";
//
const notePropTypes: NoteAttributeTypesObject = {
	'5': {
		defaultLabel: '单选',
		special: false,
		icon: <RadioButtonCheckedIcon fontSize={"inherit"}/>,
		defaultValue: () => '',
		elem: Elements.SingleSelect,
		contentView: Elements.SingleSelectContentView,
		operators: [
			{
				label: '等于',
				needTarget: true,
			},
			{
				label: '不等于',
				needTarget: true,
			},
			{
				label: '是空',
				needTarget: false,
			},
			{
				label: '不是空',
				needTarget: false,
			},
		]
	},
	'6': {
		defaultLabel: '多选',
		special: false,
		icon: <DoneAllIcon fontSize={"inherit"}/>,
		defaultValue: () => [],
		elem: Elements.MultiSelect,
		contentView: Elements.MultiSelectContentView,
		operators: [
			{
				label: '包含',
				needTarget: true,
			},
			{
				label: '不包含',
				needTarget: true,
			},
			{
				label: '是空',
				needTarget: false,
			},
			{
				label: '不是空',
				needTarget: false,
			},
		]
	},
	'7': {
		defaultLabel: '文本',
		special: false,
		icon: <TextFieldsIcon fontSize={"inherit"}/>,
		defaultValue: () => '',
		elem: Elements.Text,
		contentView: Elements.TextContentView,
		operators: [
			{
				label: '包含',
				needTarget: true,
			},
			{
				label: '不包含',
				needTarget: true,
			},
			{
				label: '等于',
				needTarget: true,
			},
			{
				label: '不等于',
				needTarget: true,
			},
			{
				label: '以...开始',
				needTarget: true,
			},
			{
				label: '以...结束',
				needTarget: true,
			},
			{
				label: '是空',
				needTarget: false,
			},
			{
				label: '不是空',
				needTarget: false,
			},
		]
	},
	'8': {
		defaultLabel: '复选框',
		special: false,
		icon: <CheckBoxIcon fontSize={"inherit"}/>,
		defaultValue: () => false,
		elem: Elements.Checkbox,
		contentView: Elements.CheckboxContentView,
		operators: [
			{
				label: '是',
				needTarget: true,
			},
			{
				label: '不是',
				needTarget: true,
			},
		]
	},
	// '10': {
	// 	defaultLabel: '日期',
	// 	special: false,
	// 	icon: <EventNoteIcon />,
	// 	defaultValue: () => '',
	// 	elem: () => <div></div>,
	// },
	// 9: {
	//   defaultLabel: 'Link',
	//   icon: <LinkIcon/>,
	//   defaultValue: () => '',
	//   elem: () => <div></div>,
	// },
	'1': {
		defaultLabel: '创建时间',
		special: true,
		icon: <AccessTimeIcon fontSize={"inherit"}/>,
		defaultValue: () => null,
		elem: Elements.CreatedTime,
		contentView: Elements.CreatedTimeContentView,
		operators: [
			{
				label: '是',
				needTarget: true,
			},
			{
				label: '在...之前',
				needTarget: true,
			},
			{
				label: '在...之后',
				needTarget: true,
			},
		]
	},
	'2': {
		defaultLabel: '最后编辑时间',
		special: true,
		icon: <AccessTimeIcon fontSize={"inherit"}/>,
		defaultValue: () => null,
		elem: Elements.ModifiedTime,
		contentView: Elements.ModifiedTimeContentView,
		operators: [
			{
				label: '是',
				needTarget: true,
			},
			{
				label: '在...之前',
				needTarget: true,
			},
			{
				label: '在...之后',
				needTarget: true,
			},
		]
	},
	'3': {
		defaultLabel: '创建人',
		special: true,
		icon: <PersonIcon fontSize={"inherit"}/>,
		defaultValue: () => null,
		elem: Elements.CreatedBy,
		contentView: Elements.CreatedByContentView,
		operators: [
			{
				label: '是',
				needTarget: true,
			},
			{
				label: '不是',
				needTarget: true,
			},
		]
	},
	'4': {
		defaultLabel: '最后编辑人',
		special: true,
		icon: <PersonIcon fontSize={"inherit"}/>,
		defaultValue: () => null,
		elem: Elements.ModifiedBy,
		contentView: Elements.ModifiedByContentView,
		operators: [
			{
				label: '是',
				needTarget: true,
			},
			{
				label: '不是',
				needTarget: true,
			},
		]
	},
}

export default notePropTypes