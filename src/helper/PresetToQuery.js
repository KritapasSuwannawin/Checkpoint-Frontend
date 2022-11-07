import { useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file';

import './PresetToQuery.scss';

function PresetToQuery(props) {
  const availableAmbientArr = useSelector((store) => store.ambient.availableAmbientArr);
  const availableBackgroundCategoryArr = useSelector((store) => store.background.availableBackgroundCategoryArr);

  function submitHandler(e) {
    e.preventDefault();

    const file = e.target[0].files[0];

    readXlsxFile(file).then((rows) => {
      const titleArr = rows[0];
      const dataArr = rows.slice(1);

      const nameIndex = titleArr.findIndex((val) => val === 'Name');
      const artistNameIndex = titleArr.findIndex((val) => val === 'Artist');
      const fineNameIndex = titleArr.findIndex((val) => val === 'File Name');
      const storyUrlIndex = titleArr.findIndex((val) => val === 'Background Story URL');

      let query =
        'INSERT INTO background (id, name,  artist_name, file_path, thumbnail_file_path, story_url, ambient_id_arr, is_member, category_id, is_top_hit) VALUES';

      let name = '';
      let artistName = '';
      dataArr.forEach((data) => {
        name = data[nameIndex] ? data[nameIndex] : name;
        artistName = data[artistNameIndex] ? data[artistNameIndex] : artistName;

        const ambientIdArr = [];
        data.forEach((element, i) => {
          if (element === 1) {
            const ambientName = titleArr[i];
            const ambientId = availableAmbientArr.find(
              (ambient) => ambient.name.toLowerCase() === ambientName.replace('_', ' ').toLowerCase()
            ).id;
            ambientIdArr.push(ambientId);
          }
        });

        const fileName = data[fineNameIndex];

        const group = fileName.slice(0, -2);
        const initial = fileName.slice(0, -4);
        const category = fileName.slice(0, -6);

        const filePath = `BG/${initial}/${group}_1080p/${fileName}.mp4`;
        const tnFilePath = `BG/${initial}/${group}_1080p/${category}T${fileName.slice(-6, -2)}/${category}T${fileName.slice(-6)}.jpg`;
        const storyUrl = data[storyUrlIndex] ? `'${data[storyUrlIndex]}'` : null;
        const isMember = group === 'Anime_BG01' || group === 'Anime_BG02' ? 'false' : 'true';
        const categoryId = availableBackgroundCategoryArr.find((cat) => cat.name === fileName.slice(0, -7)).id;
        const isTopHit = ['Anime_BG08', 'Anime_BG10', 'Anime_BG05', 'Game_BG01', 'Seasonal_BG01'].includes(group);

        query += `\n    ('${fileName}', '${name}', '${artistName}', '${filePath}', '${tnFilePath}', ${storyUrl}, ARRAY[${ambientIdArr}], ${isMember}, ${categoryId}, ${isTopHit}),`;
      });

      query = query.slice(0, -1) + ';';

      console.log(query);
    });
  }

  return (
    <div className="preset-to-query">
      <form onSubmit={submitHandler}>
        <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default PresetToQuery;
