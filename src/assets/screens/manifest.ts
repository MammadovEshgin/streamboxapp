import discoverSm from "./discover-page-sm.avif";
import discoverSmW from "./discover-page-sm.webp";
import discoverSmJ from "./discover-page-sm.jpg";
import discoverMd from "./discover-page-md.avif";
import discoverMdW from "./discover-page-md.webp";
import discoverMdJ from "./discover-page-md.jpg";

import movieSm from "./movie-detail-page-sm.avif";
import movieSmW from "./movie-detail-page-sm.webp";
import movieSmJ from "./movie-detail-page-sm.jpg";
import movieMd from "./movie-detail-page-md.avif";
import movieMdW from "./movie-detail-page-md.webp";
import movieMdJ from "./movie-detail-page-md.jpg";

import seriesV1Sm from "./series-detail-page-v1-sm.avif";
import seriesV1SmW from "./series-detail-page-v1-sm.webp";
import seriesV1SmJ from "./series-detail-page-v1-sm.jpg";
import seriesV1Md from "./series-detail-page-v1-md.avif";
import seriesV1MdW from "./series-detail-page-v1-md.webp";
import seriesV1MdJ from "./series-detail-page-v1-md.jpg";

import seriesV2Sm from "./series-detail-page-v2-sm.avif";
import seriesV2SmW from "./series-detail-page-v2-sm.webp";
import seriesV2SmJ from "./series-detail-page-v2-sm.jpg";
import seriesV2Md from "./series-detail-page-v2-md.avif";
import seriesV2MdW from "./series-detail-page-v2-md.webp";
import seriesV2MdJ from "./series-detail-page-v2-md.jpg";

import seriesListSm from "./series-page-sm.avif";
import seriesListSmW from "./series-page-sm.webp";
import seriesListSmJ from "./series-page-sm.jpg";
import seriesListMd from "./series-page-md.avif";
import seriesListMdW from "./series-page-md.webp";
import seriesListMdJ from "./series-page-md.jpg";

import moviesSm from "./movies-page-sm.avif";
import moviesSmW from "./movies-page-sm.webp";
import moviesSmJ from "./movies-page-sm.jpg";
import moviesMd from "./movies-page-md.avif";
import moviesMdW from "./movies-page-md.webp";
import moviesMdJ from "./movies-page-md.jpg";

import actorSm from "./actor-page-sm.avif";
import actorSmW from "./actor-page-sm.webp";
import actorSmJ from "./actor-page-sm.jpg";
import actorMd from "./actor-page-md.avif";
import actorMdW from "./actor-page-md.webp";
import actorMdJ from "./actor-page-md.jpg";

import journeysSm from "./cinematic-journeys-page-sm.avif";
import journeysSmW from "./cinematic-journeys-page-sm.webp";
import journeysSmJ from "./cinematic-journeys-page-sm.jpg";
import journeysMd from "./cinematic-journeys-page-md.avif";
import journeysMdW from "./cinematic-journeys-page-md.webp";
import journeysMdJ from "./cinematic-journeys-page-md.jpg";

import franchiseSm from "./one-frenchise-detail-page-sm.avif";
import franchiseSmW from "./one-frenchise-detail-page-sm.webp";
import franchiseSmJ from "./one-frenchise-detail-page-sm.jpg";
import franchiseMd from "./one-frenchise-detail-page-md.avif";
import franchiseMdW from "./one-frenchise-detail-page-md.webp";
import franchiseMdJ from "./one-frenchise-detail-page-md.jpg";

import profileSm from "./profile-page-sm.avif";
import profileSmW from "./profile-page-sm.webp";
import profileSmJ from "./profile-page-sm.jpg";
import profileMd from "./profile-page-md.avif";
import profileMdW from "./profile-page-md.webp";
import profileMdJ from "./profile-page-md.jpg";

import stats1Sm from "./stats-page-v1-sm.avif";
import stats1SmW from "./stats-page-v1-sm.webp";
import stats1SmJ from "./stats-page-v1-sm.jpg";
import stats1Md from "./stats-page-v1-md.avif";
import stats1MdW from "./stats-page-v1-md.webp";
import stats1MdJ from "./stats-page-v1-md.jpg";

import stats2Sm from "./stats-page-v2-sm.avif";
import stats2SmW from "./stats-page-v2-sm.webp";
import stats2SmJ from "./stats-page-v2-sm.jpg";
import stats2Md from "./stats-page-v2-md.avif";
import stats2MdW from "./stats-page-v2-md.webp";
import stats2MdJ from "./stats-page-v2-md.jpg";

import stats3Sm from "./stats-page-v3-sm.avif";
import stats3SmW from "./stats-page-v3-sm.webp";
import stats3SmJ from "./stats-page-v3-sm.jpg";
import stats3Md from "./stats-page-v3-md.avif";
import stats3MdW from "./stats-page-v3-md.webp";
import stats3MdJ from "./stats-page-v3-md.jpg";

import stats4Sm from "./stats-page-v4-sm.avif";
import stats4SmW from "./stats-page-v4-sm.webp";
import stats4SmJ from "./stats-page-v4-sm.jpg";
import stats4Md from "./stats-page-v4-md.avif";
import stats4MdW from "./stats-page-v4-md.webp";
import stats4MdJ from "./stats-page-v4-md.jpg";

import stats5Sm from "./stats-page-v5-sm.avif";
import stats5SmW from "./stats-page-v5-sm.webp";
import stats5SmJ from "./stats-page-v5-sm.jpg";
import stats5Md from "./stats-page-v5-md.avif";
import stats5MdW from "./stats-page-v5-md.webp";
import stats5MdJ from "./stats-page-v5-md.jpg";

export type ScreenSources = {
  avif: { sm: string; md: string };
  webp: { sm: string; md: string };
  jpg: { sm: string; md: string };
};

const make = (
  smAvif: string,
  smWebp: string,
  smJpg: string,
  mdAvif: string,
  mdWebp: string,
  mdJpg: string,
): ScreenSources => ({
  avif: { sm: smAvif, md: mdAvif },
  webp: { sm: smWebp, md: mdWebp },
  jpg: { sm: smJpg, md: mdJpg },
});

export const screens = {
  discover: make(discoverSm, discoverSmW, discoverSmJ, discoverMd, discoverMdW, discoverMdJ),
  movieDetail: make(movieSm, movieSmW, movieSmJ, movieMd, movieMdW, movieMdJ),
  seriesDetailV1: make(seriesV1Sm, seriesV1SmW, seriesV1SmJ, seriesV1Md, seriesV1MdW, seriesV1MdJ),
  seriesDetailV2: make(seriesV2Sm, seriesV2SmW, seriesV2SmJ, seriesV2Md, seriesV2MdW, seriesV2MdJ),
  series: make(seriesListSm, seriesListSmW, seriesListSmJ, seriesListMd, seriesListMdW, seriesListMdJ),
  movies: make(moviesSm, moviesSmW, moviesSmJ, moviesMd, moviesMdW, moviesMdJ),
  actor: make(actorSm, actorSmW, actorSmJ, actorMd, actorMdW, actorMdJ),
  journeys: make(journeysSm, journeysSmW, journeysSmJ, journeysMd, journeysMdW, journeysMdJ),
  franchise: make(franchiseSm, franchiseSmW, franchiseSmJ, franchiseMd, franchiseMdW, franchiseMdJ),
  profile: make(profileSm, profileSmW, profileSmJ, profileMd, profileMdW, profileMdJ),
  stats1: make(stats1Sm, stats1SmW, stats1SmJ, stats1Md, stats1MdW, stats1MdJ),
  stats2: make(stats2Sm, stats2SmW, stats2SmJ, stats2Md, stats2MdW, stats2MdJ),
  stats3: make(stats3Sm, stats3SmW, stats3SmJ, stats3Md, stats3MdW, stats3MdJ),
  stats4: make(stats4Sm, stats4SmW, stats4SmJ, stats4Md, stats4MdW, stats4MdJ),
  stats5: make(stats5Sm, stats5SmW, stats5SmJ, stats5Md, stats5MdW, stats5MdJ),
} as const;

export type ScreenKey = keyof typeof screens;
