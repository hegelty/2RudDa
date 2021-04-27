importClass(org.jsoup.Jsoup);
const scriptName = "autoselfcheck";

let selfcheck_route = "/sdcard/BUKGWAKBOT/selfcheck.json";
const FS = FileStream;

var result = "";

function Autoselfcheck_Function()
{
  result="";
  selfcheckList = JSON.parse(FS.read(selfcheck_route));
  for(i=0;i<selfcheckList.인원;i++)
  {
      let name = (selfcheckList.데이터)[i].이름;
      let birth = (selfcheckList.데이터)[i].생일;
      let pass = (selfcheckList.데이터)[i].비밀번호;
      let number = (selfcheckList.데이터)[i].번호;
      status = Jsoup.connect("https://api.self-check.msub.kr/?local=경기&sctype=고등학교&scname=경기북과학고등학교&name="
                              + name
                              + "&birth="
                              + birth
                              + "&pass="
                              + pass
                              ).ignoreContentType(true).get().text();
      if(status.split(":")[1].split(",")[0]=="0")
      {
          result += number + name + " 성공\n";
      }
      else
      {
          result += number + name + " " + status.split('"')[6].split('"')[0] + "\n";
      }
  }
  return result;
}