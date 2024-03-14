import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import { setChonkyDefaults } from 'chonky'
import {
  FileBrowser,
  ChonkyActions,
  FileNavbar,
  FileToolbar,
  FileList,
} from 'chonky'
import { ChonkyIconFA } from 'chonky-icon-fontawesome'
import PropTypes from 'prop-types'

setChonkyDefaults({ iconComponent: ChonkyIconFA })

// ******** api *****************************************
async function getDirectoryContents(path, filenameFilter) {
  const response = await fetch(
    '/api/data/dir?' + new URLSearchParams({ path: path }),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response.status >= 400) {
    throw new Error(await response.text())
  }
  const data = await response.json()

  var contents = []
  if (data.dirnames) {
    data.dirnames.forEach((f) =>
      contents.push({
        id: data.absolutepath + data.pathsep + f,
        name: f,
        isDir: true,
      }),
    )
  }
  if (data.filenames) {
    data.filenames
      .filter((f) => filenameFilter(f))
      .forEach((f) =>
        contents.push({
          id: data.absolutepath + data.pathsep + f,
          name: f,
          isDir: false,
        }),
      )
  }
  var folderChain = []
  var folderPath = ''
  for (var i = 0; i < data.pathparts.length; i++) {
    if (i === 0) {
      folderPath = data.pathparts[0]
    } else {
      folderPath = folderPath + data.pathsep + data.pathparts[i]
    }
    folderChain.push({
      id: folderPath,
      name: data.pathparts[i],
      isDir: true,
    })
  }
  return {
    absolutePath: data.absolutePath,
    folderChain: folderChain,
    contents: contents,
    pathSeparator: data.pathsep,
  }
}

/**
 * @returns browser data file
 */
export const DataFileBrowser = (props) => {
  const [files, setFiles] = useState([])
  const [folderChain, setFolderChain] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [error, setError] = useState(null)

  var pathSeparator = '/'
  var currentPath = props.path

  const changeDirectory = function (newPath) {
    getDirectoryContents(newPath, props.filenameFilter)
      .then((directoryContents) => {
        setError(null)
        currentPath = directoryContents.absolutePath
        pathSeparator = directoryContents.pathSeparator
        setFiles(directoryContents.contents)
        setFolderChain(directoryContents.folderChain)
      })
      .catch((error) => setError(error.message))
  }
  useEffect(() => changeDirectory(currentPath), [props.path])

  const handleFileAction = React.useCallback(
    (action) => {
      if (action.id === ChonkyActions.MouseClickFile.id) {
        if (action.payload.file.isDir) {
          changeDirectory(action.payload.file.id)
        } else if (!props.multiSelect) {
          const newSelectedFiles = [action.payload.file.id]
          setSelectedFiles(newSelectedFiles)
          props.handleSelectFiles(newSelectedFiles)
        }
        // } else if (action.id === ChonkyActions.OpenParentFolder.id) {
        //   changeDirectory(currentPath + pathSeparator + '..')
      } else if (action.id === ChonkyActions.ChangeSelection.id) {
        const newSelectedFiles = Array.from(action.payload.selection)
          .map((fileID) => files.find((file) => file.id === fileID))
          .filter((file) => !file.isDir)
          .map((file) => file.id)
        setSelectedFiles(newSelectedFiles)
        props.handleSelectFiles(newSelectedFiles)
      } else if (
        action.id === ChonkyActions.OpenFiles.id &&
        action.payload.files[0].isDir
      ) {
        // double click only works on directories
        changeDirectory(action.payload.files[0].id)
      }
    },
    [
      currentPath,
      pathSeparator,
      setSelectedFiles,
      props.handleSelectFiles,
      files,
    ],
  )
  return (
    <div style={{ height: 550 }}>
      <FileBrowser
        files={files}
        disableDefaultFileActions={[
          ChonkyActions.OpenSelection.id,
          ChonkyActions.SelectAllFiles.id,
          ChonkyActions.ClearSelection.id,
        ]}
        disableDragAndDrop={true}
        darkMode={true}
        disableSelection={!props.multiSelect}
        onFileAction={handleFileAction}
        folderChain={folderChain}
      >
        <FileNavbar />
        <FileToolbar />
        <FileList />
      </FileBrowser>
      {error && (
        <div style={{ color: 'red', fontSize: '10px' }}>
          An error has occurred while reading the directory content: {error}
        </div>
      )}
      {selectedFiles.length > 0 ? (
        <div style={{ color: 'organge', fontSize: '10px' }}>
          Selected files: {selectedFiles.toString()}
        </div>
      ) : null}
    </div>
  )
}

/**
 * The dialogue browsing of data
 */
export default class DataBrowserDialog extends React.Component {
  constructor(props) {
    super(props)

    DataBrowserDialog.propTypes = {
      dataBrowserDialogFunctions: PropTypes.object,
      onFilesSelected: PropTypes.func,
    }

    props.dataBrowserDialogFunctions.setVisible = (isVisible) =>
      this.setVisible(isVisible)
    props.dataBrowserDialogFunctions.setPath = (path) => this.setPath(path)
    props.dataBrowserDialogFunctions.setFilenameFilter = (filenameFilter) =>
      this.setFilenameFilter(filenameFilter)
    props.dataBrowserDialogFunctions.setMultiSelect = (multiSelect) =>
      this.setMultiSelect(multiSelect)

    this.state = {
      visible: false,
      path: null,
      filenameFilter: () => true,
      multiSelect: false,
      selectedFiles: [],
    }
    this._isMounted = false
  }

  setVisible(isVisible) {
    this.setState({
      visible: isVisible,
    })
  }

  setPath(path) {
    this.setState({
      path: path,
    })
  }

  setFilenameFilter(filenameFilter) {
    this.setState({
      filenameFilter: filenameFilter,
    })
  }

  setMultiSelect(multiSelect) {
    this.setState({
      multiSelect: multiSelect,
    })
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidUpdate(prevProps) {
    this.props.dataBrowserDialogFunctions.setVisible = (isVisible) =>
      this.setVisible(isVisible)
    this.props.dataBrowserDialogFunctions.setPath = (path) => this.setPath(path)
    this.props.dataBrowserDialogFunctions.setFilenameFilter = (
      filenameFilter,
    ) => this.setFilenameFilter(filenameFilter)
    this.props.dataBrowserDialogFunctions.setMultiSelect = (multiSelect) =>
      this.setMultiSelect(multiSelect)
  }

  handleCancel() {
    this.setVisible(false)
  }

  handleOK() {
    this.props.onFilesSelected(this.state.selectedFiles)
    this.setVisible(false)
  }

  btnStyle = {
    marginRight: '10px',
    width: '75px',
    marginTop: '12px',
  }

  render() {
    return (
      <div>
        <Modal
          className="dataBrowserDialog"
          open={this.state.visible}
          destroyOnClose={true}
          closable={false}
          onOk={() => this.handleOK()}
          onCancel={() => this.handleCancel()}
          width={1200}
          height={3000}
          style={{ marginTop: '-90px' }}
          footer={[
            <Button
              key="cancel"
              onClick={() => this.handleCancel()}
              style={this.btnStyle}
            >
              Cancel
            </Button>,
            <Button
              style={this.btnStyle}
              key="Ok"
              onClick={() => this.handleOK()}
              disabled={this.state.selectedFiles.length === 0}
            >
              Ok
            </Button>,
          ]}
        >
          <DataFileBrowser
            handleSelectFiles={(files) =>
              this.setState({ selectedFiles: files })
            }
            path={this.state.path}
            filenameFilter={this.state.filenameFilter}
            multiSelect={this.state.multiSelect}
          />
        </Modal>
      </div>
    )
  }
}
