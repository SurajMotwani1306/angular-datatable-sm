export interface TableData {
    id: number;
    username: string;
    email: string;
    headers: any[],
    entries: any[],
    permissions: {
      searchVisibility: boolean,
      exportToCsvVisibility: boolean,
      filterTableHeadersVisibility: boolean,
      filterBtnTableContentVisibility: boolean,
      showcaseActionButtons: String[]
    },
    dependentKeys: {
      totalNumberOfPages: number,
      progressColumn: string,
      progressBarType?: string,
      ratingsColumn: string,
      filterColumn: string,
      maxRating: number,
      editSaveActionButtonBgColor?: string,
      deleteActionButtonBgColor?: string,
      closeActionButtonBgColor?: string
    },
    extras: {
      uncheckAllStatus: boolean,
      dropdownButtonText?: string,
      filterBoxArrowStatus: boolean
    }
}