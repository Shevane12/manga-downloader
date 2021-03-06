const MangaProvider = require("baruch-manga-provider");
const {
  GoodMangaCrawler,
  MangaReaderCrawler
} = require("baruch-manga-provider/lib/crawlers");

MangaProvider.addCrawler(new GoodMangaCrawler());
MangaProvider.addCrawler(new MangaReaderCrawler());

exports.updateMangaProviders = async (req, res) => {
  await MangaProvider.updateMangaDb();
  res.json({ status: "success" });
};

// exports.addProvider = async (req, res) => {
//   await MangaProvider.addCrawler(req.body);
//   res.json({ status: "success" });
// };

exports.getMangas = async (req, res) => {
  let mangas = [];
  if (req.query.title) {
    mangas = await MangaProvider.search(req.query.title);
  } else {
    mangas = await MangaProvider.search("");
  }
  await res.json(mangas);
};

exports.getMangaInfo = async (req, res) => {
  const location = decryptParam(req.params.mangaLocation);
  const manga = await MangaProvider.getMangaInfo(location);
  await res.json(manga);
};

exports.getChapters = async (req, res) => {
  const location = decryptParam(req.params.mangaLocation);
  const chapters = await MangaProvider.getChapters(location);
  await res.json(chapters);
};

exports.getPages = async (req, res) => {
  const location = decryptParam(req.params.chapterLocation);
  const pages = await MangaProvider.getPages(location);
  await res.json(pages);
};

exports.getSourceFromLocation = async (req, res) => {
  const location = decryptParam(req.params.mangaLocation);
  return res.json(MangaProvider.getSourceFromLocation(location));
};

const decryptParam = param => {
  return new Buffer(param, "base64").toString("binary");
};
