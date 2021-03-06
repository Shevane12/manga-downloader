import React from "react";
import { connect } from "react-redux";

import MangaInfo from "../components/manga-info";
import {
  selectMangaForDownload,
  selectChapters,
  unselectAllChapters,
  setIsMangaFetchingStatus,
  addDownloadedChapter
} from "../actions/list_actions";
import { doDownloadManga } from "../actions/download";

const SelectedMangaInfo = ({
  isFetchingManga,
  manga,
  onClickClose,
  onClickAdd,
  selectedChapters,
  defaultSaveLocation,
  defaultCompressToCbz
}) => {
  return (
    <div>
      <MangaInfo
        manga={manga}
        onClickClose={() => {
          setTimeout(() => {
            onClickClose();
          }, 500);
        }}
        onClickAdd={onClickAdd}
        selectedChapters={selectedChapters}
        isFetchingManga={isFetchingManga}
        defaultSaveLocation={defaultSaveLocation}
        defaultCompressToCbz={defaultCompressToCbz}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isFetchingManga: state.isFetchingManga,
  manga: state.selectedMangaForDownload,
  selectedChapters: state.selectedChapters,
  defaultSaveLocation: state.settings.saveLocation,
  defaultCompressToCbz: state.settings.compressToCbz
});

const mapDispatchToProps = dispatch => ({
  onClickClose: () => {
    dispatch(setIsMangaFetchingStatus(false));
    dispatch(selectMangaForDownload(null));
  },
  onClickAdd: (manga, location, compressToCbz, chapters) => {
    dispatch(doDownloadManga(manga, location, compressToCbz, chapters));
    dispatch(selectMangaForDownload(null));
    dispatch(selectChapters(null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMangaInfo);
