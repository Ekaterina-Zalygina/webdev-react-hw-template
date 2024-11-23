import renderer from "react-test-renderer"
import { Playlist } from "./Playlist"

it("renders correctly", () => {
    const tree = renderer.create(<Playlist likedTracksIds={new Set()} setLikedTracks={() => {}} tracks={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
})
