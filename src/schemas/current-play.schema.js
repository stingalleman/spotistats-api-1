const GraphQL = require('graphql');

const TrackType = require('./track.schema');

const {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
} = GraphQL;

/**
 * Schema used to define the currently playing track
 */
const CurrentPlayType = new GraphQLObjectType({
  name: 'currentPlay',
  fields: () => ({
    item: { type: TrackType },
    isPlaying: { type: GraphQLBoolean },
    playedAt: { type: GraphQLString },
  }),
});

module.exports = CurrentPlayType;
