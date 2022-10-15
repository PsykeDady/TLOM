import HomeHeaderComponent from "./HomeHeader/home.header.component";
function HomeComponent () {

	return <div className="container rounded primary-bg text-fg pb-3 pt-1">

		<div className="row">
			<div className="col-12">
				<HomeHeaderComponent></HomeHeaderComponent>
			</div>
		</div>

	</div>
}
export default HomeComponent; 