import React from "react";
import cloneDeep from "lodash.clonedeep";
import { useScrollNearEnd } from "../../hooks";
import SkeletonChangeSet from "./SkeletonChangeSet";
import ChangeSetWrapper from "./ChangeSet";

const HISTORY_LIMIT = 50;
const HISTORY_ENDPOINT = `https://api.mousey.app/v3/emoji/blobs+community-blobs/changes?count=${HISTORY_LIMIT}`;

const HISTORY_EVENTS = [
  "EMOJI_CREATE",
  "EMOJI_RENAME",
  "EMOJI_UPDATE",
  "EMOJI_REMOVE",
];

function groupHistory(changeSets) {
  let changes = {};

  for (const changeSet of changeSets) {
    if (!HISTORY_EVENTS.includes(changeSet.event)) {
      continue;
    }

    changeSet.changed_at += "+00:00";
    const date = new Date(changeSet.changed_at);

    const key = [
      changeSet.guild.id,
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
    ].join("_");

    if (!changes[key]) {
      changes[key] = [];
    }

    changes[key].push(changeSet);
  }

  return changes;
}

function RecentChanges() {
  const [changeSets, setChangeSets] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [earliest, setEarliest] = React.useState(null);
  const [reachedEnd, setReachedEnd] = React.useState(false);
  const [skeletons] = React.useState(Math.floor(Math.random() * 3) + 3);

  async function load() {
    setLoading(true);

    let endpoint = HISTORY_ENDPOINT;

    if (earliest) {
      // If we've already loaded changes before, only load earlier ones.
      endpoint += `&before=${earliest}`;
    }

    const response = await fetch(endpoint);
    const json = await response.json();

    if (json.length < HISTORY_LIMIT) {
      setReachedEnd(true);
    }

    setLoading(false);

    if (changeSets != null) {
      // We need to merge the changesets.
      const newChangeSets = groupHistory(json);
      const newState = cloneDeep(changeSets);

      for (const [key, value] of Object.entries(newChangeSets)) {
        if (key in newState) {
          newState[key] = newState[key].concat(value);
        } else {
          newState[key] = value;
        }
      }

      setChangeSets(newState);
    } else {
      setChangeSets(groupHistory(json));
    }

    setEarliest(json[json.length - 1].changed_at.replace("+00:00", ""));
  }

  React.useEffect(() => {
    load();
  }, []);

  useScrollNearEnd(() => {
    if (!loading && !reachedEnd) {
      load();
    }
  });

  if (changeSets == null) {
    return Array.from({ length: skeletons }, (_, index) => (
      <SkeletonChangeSet key={index} />
    ));
  }

  return Object.entries(changeSets).map(([key, changeSet]) => (
    <ChangeSetWrapper changeSet={changeSet} key={key} />
  ));
}

RecentChanges.whyDidYouRender = true;

export default RecentChanges;
