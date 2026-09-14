import actorMd from "./actor-page-md.webp";
import actorSm from "./actor-page-sm.webp";
import journeysMd from "./cinematic-journeys-page-md.webp";
import journeysSm from "./cinematic-journeys-page-sm.webp";
import discoverMd from "./discover-page-md.webp";
import discoverSm from "./discover-page-sm.webp";
import franchiseMd from "./franchise-detail-page-md.webp";
import franchiseSm from "./franchise-detail-page-sm.webp";
import movieDetailMd from "./movie-detail-page-md.webp";
import movieDetailSm from "./movie-detail-page-sm.webp";
import moviesMd from "./movies-page-md.webp";
import moviesSm from "./movies-page-sm.webp";
import profileMd from "./profile-page-md.webp";
import profileSm from "./profile-page-sm.webp";
import seriesV1Md from "./series-detail-page-v1-md.webp";
import seriesV1Sm from "./series-detail-page-v1-sm.webp";
import seriesV2Md from "./series-detail-page-v2-md.webp";
import seriesV2Sm from "./series-detail-page-v2-sm.webp";
import seriesListMd from "./series-page-md.webp";
import seriesListSm from "./series-page-sm.webp";
import stats1Md from "./stats-page-v1-md.webp";
import stats1Sm from "./stats-page-v1-sm.webp";
import stats2Md from "./stats-page-v2-md.webp";
import stats2Sm from "./stats-page-v2-sm.webp";
import stats3Md from "./stats-page-v3-md.webp";
import stats3Sm from "./stats-page-v3-sm.webp";
import stats4Md from "./stats-page-v4-md.webp";
import stats4Sm from "./stats-page-v4-sm.webp";
import stats5Md from "./stats-page-v5-md.webp";
import stats5Sm from "./stats-page-v5-sm.webp";

/** Each screenshot ships in two widths: `sm` (480w) and `md` (768w). */
export interface ScreenSources {
  sm: string;
  md: string;
}

const pair = (sm: string, md: string): ScreenSources => ({ sm, md });

export const screens = {
  discover: pair(discoverSm, discoverMd),
  movieDetail: pair(movieDetailSm, movieDetailMd),
  seriesDetailV1: pair(seriesV1Sm, seriesV1Md),
  seriesDetailV2: pair(seriesV2Sm, seriesV2Md),
  series: pair(seriesListSm, seriesListMd),
  movies: pair(moviesSm, moviesMd),
  actor: pair(actorSm, actorMd),
  journeys: pair(journeysSm, journeysMd),
  franchise: pair(franchiseSm, franchiseMd),
  profile: pair(profileSm, profileMd),
  stats1: pair(stats1Sm, stats1Md),
  stats2: pair(stats2Sm, stats2Md),
  stats3: pair(stats3Sm, stats3Md),
  stats4: pair(stats4Sm, stats4Md),
  stats5: pair(stats5Sm, stats5Md),
} satisfies Record<string, ScreenSources>;
