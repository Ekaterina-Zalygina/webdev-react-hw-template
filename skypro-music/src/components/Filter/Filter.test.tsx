import { fireEvent, render, screen } from "@testing-library/react"
import { Filter } from "./Filter"
import "@testing-library/jest-dom"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { TrackType } from "@/TrackType"

jest.mock("../../store/store")

const tracks: TrackType[] = [
  {
    _id: 1,
    album: "Album1",
    author: "Author1",
    duration_in_seconds: 100,
    genre: ["Genre1"],
    name: "Track1",
    release_date: "2024-09-22",
    track_file: "track1.mp3",
    staredUser: [],
  },
  {
    _id: 2,
    album: "Album2",
    author: "Author2",
    duration_in_seconds: 100,
    genre: ["Genre2"],
    name: "Track2",
    release_date: "2024-09-22",
    track_file: "track2.mp3",
    staredUser: [],
  },
  {
    _id: 3,
    album: "Album3",
    author: "Author3",
    duration_in_seconds: 100,
    genre: ["Genre3"],
    name: "Track3",
    release_date: "2024-09-22",
    track_file: "track3.mp3",
    staredUser: [],
  },
]

const mockUseAppSelector = useAppSelector as jest.Mock<typeof useAppSelector>
const mockUseAppDispatch = useAppDispatch as jest.Mock

describe("Filter component", () => {
  let dispatchMock: jest.Mock

  beforeEach(() => {
    dispatchMock = jest.fn()
    mockUseAppDispatch.mockReturnValue(dispatchMock)
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        trackSlice: {
          tracks: tracks,
          thisTrack: null,
          shuffleTrack: tracks,
          isShuffle: false,
          isPlayTrack: false,
          id: null,
        },
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const { container } = render(
      <Filter tracks={tracks} onSelect={() => {}} selectedFilter="" selectedFilterValue="" />
    )
    expect(container).toMatchSnapshot()
  })

  it("filters should be rendered", () => {
    render(<Filter tracks={tracks} onSelect={() => {}} selectedFilter="" selectedFilterValue="" />)
    expect(screen.getByText("Искать по:")).toBeInTheDocument()
    expect(screen.getByText("исполнителю")).toBeInTheDocument()
    expect(screen.getByText("году")).toBeInTheDocument()
    expect(screen.getByText("жанру")).toBeInTheDocument()
  })

  it("active filter should be underlined", () => {
    render(<Filter tracks={tracks} onSelect={() => {}} selectedFilter="author" selectedFilterValue="Author1" />)
    const authorFilter = screen.getByText("исполнителю")
    fireEvent.click(authorFilter)

    const filter = screen.getByText("Author1")

    expect(filter).toHaveStyle({ textDecoration: "underline" })
  })
})
